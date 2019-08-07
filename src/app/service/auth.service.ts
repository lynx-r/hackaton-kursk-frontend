import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Observable, of } from 'rxjs';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';
import { catchError, map, tap } from 'rxjs/operators';
import { ClientDigestAuth } from '@mreal/digest-auth';
import { ApiConstant } from '../config/api-constant';

declare var digestAuthRequest: any;

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private apiService: ApiService,
        private storageService: StorageService
    ) {
    }

    get isLoggedIn() {
        if (!AuthService.isOnline()) {
            return of(true);
        }
        return this.apiService.isAuthorized()
            .pipe(
                map(res => res.isLoggedIn),
                catchError(err => {
                    this.token = null;
                    return of(false);
                })
            );
    }

    static isOnline() {
        return navigator.onLine;
    }

    get token() {
        return this.storageService.getToken();
    }

    set token(token: string) {
        this.storageService.saveToken(token);
    }

    login(user: User): Observable<boolean> {
        return this.apiService.authObserve()
            .pipe(
                map(() => false),
                catchError(err => {
                    const incomingDigest = ClientDigestAuth.analyze(err.headers.get('WWW-Authenticate'));
                    const digest = ClientDigestAuth.generateProtectionAuth(incomingDigest,
                        user.phone, user.password, {
                            method: 'POST',
                            uri: ApiConstant.AUTH_LOGIN,
                            counter: 1
                        });
                    return this.apiService.getToken(digest.raw)
                        .pipe(
                            map(res => {
                                this.token = res.token;
                                return true;
                            }),
                            catchError(err => {
                                this.token = null;
                                return of(false);
                            })
                        );
                }),
            );
        // const getRequest = new digestAuthRequest('GET', ApiConstant.AUTH_LOGIN, user.phone, user.password);
        // return new Observable<any>(subscriber => {
        //     getRequest.request(data => {
        //             this.token = data.token;
        //         subscriber.next(true);
        //             subscriber.complete();
        //         }, errorCode => {
        //             console.log('error', errorCode);
        //         this.token = null;
        //         subscriber.next(false);
        //             subscriber.complete();
        //         }
        //     );
        // });
    }

    logout() {
        return this.apiService.logout()
            .pipe(
                tap(() => this.token = null)
            );
    }
}
