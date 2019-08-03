import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Observable, of } from 'rxjs';
import { ApiService } from './api.service';
import { catchError, map } from 'rxjs/operators';
import { StorageService } from './storage.service';

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

    login(credentials: User): Observable<boolean> {
        return this.apiService.authUser(credentials)
            .pipe(
                map(token => {
                    console.log(token);
                    this.token = token.token;
                    return true;
                }),
                catchError(err => {
                    console.log(err);
                    this.token = null;
                    return of(false);
                })
            );
    }

    logout() {
        this.token = null;
    }
}
