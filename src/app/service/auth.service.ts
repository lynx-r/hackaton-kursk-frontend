import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';
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
        return !!this.storageService.getToken();
    }

    get token() {
        return this.storageService.getToken();
    }

    set token(token: string) {
        this.storageService.saveToken(token);
    }

    login(user: User): Observable<any> {
        const getRequest = new digestAuthRequest('GET', ApiConstant.AUTH_LOGIN, user.phone, `${user.password}`);
        return new Observable<any>(subscriber => {
            getRequest.request(data => {
                    console.log('data', data);
                    this.token = data.token;
                    subscriber.next(data);
                    subscriber.complete();
                }, errorCode => {
                    this.token = null;
                    console.log('error', errorCode);
                    subscriber.error(errorCode);
                    subscriber.complete();
                }
            );
        });

        // return this.apiService.authUser(credentials)
        //     .pipe(
        //         map(token => {
        //             console.log(token);
        //             this.token = token.token;
        //             return true;
        //         }),
        //         catchError(err => {
        //             console.log(err);
        //             this.token = null;
        //             return of(false);
        //         })
        //     );
    }

    logout() {
        this.token = null;
    }
}
