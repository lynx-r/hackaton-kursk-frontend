import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConstant } from '../config/api-constant';
import { User } from '../model/user.model';
import { Observable } from 'rxjs';
import { JwtToken } from '../model/jwt-token';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(
        private http: HttpClient
    ) {
    }


    authUser(user: User): Observable<JwtToken> {
        return this.httpPost(ApiConstant.AUTH_LOGIN, user);
    }

    getMetrics() {
        return this.httpGet(ApiConstant.METRICS);
    }

    // private http

    private httpGet<T>(url: string) {
        return this.http.get<T>(url);
    }

    private httpPost<T>(url: string, data: any) {
        return this.http.post<T>(url, data);
    }
}
