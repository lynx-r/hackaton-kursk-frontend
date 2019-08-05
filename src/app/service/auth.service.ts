import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Observable, of } from 'rxjs';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';
import { ApiConstant } from '../config/api-constant';
import { catchError, map, tap } from 'rxjs/operators';

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
        return this.apiService.isAuthorized()
            .pipe(
                map(res => res.isLoggedIn),
                catchError(err => {
                    return of(false);
                })
            );
    }

    get token() {
        return this.storageService.getToken();
    }

    set token(token: string) {
        this.storageService.saveToken(token);
    }

    login(user: User): Observable<any> {
        const getRequest = new digestAuthRequest('GET', ApiConstant.AUTH_LOGIN, user.phone, user.password);
        return new Observable<any>(subscriber => {
            getRequest.request(data => {
                    console.log('data', data);
                    this.token = data.token;
                subscriber.next(true);
                    subscriber.complete();
                }, errorCode => {
                    console.log('error', errorCode);
                this.token = null;
                subscriber.next(false);
                    subscriber.complete();
                }
            );
        });
    }

    logout() {
        return this.apiService.logout()
            .pipe(
                tap(() => this.token = null)
            );
    }
}
