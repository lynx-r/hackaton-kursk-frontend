import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage';
import { CookieService } from 'ngx-cookie';
import { AppConstant } from '../config/app-constant';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor(
        private storageService: LocalStorageService,
        private cookieService: CookieService
    ) {
    }

    getToken() {
        return this.cookieService.get(AppConstant.AUTH_TOKEN);
    }

    saveToken(token: string) {
        this.cookieService.put(AppConstant.AUTH_TOKEN, token);
    }

}
