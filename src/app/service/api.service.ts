import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConstant } from '../config/api-constant';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(
        private http: HttpClient
    ) {
    }


    getMetrics() {
        return this.httpGet(ApiConstant.METRICS);
    }

    logout() {
        return this.httpPost(ApiConstant.LOGOUT, {});
    }

    // private http

    private httpGet<T>(url: string) {
        return this.http.get<T>(url);
    }

    private httpPost<T>(url: string, data: any) {
        return this.http.post<T>(url, data);
    }
}
