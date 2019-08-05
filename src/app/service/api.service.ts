import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApiConstant } from '../config/api-constant';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotifyService } from './notify.service';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(
        private http: HttpClient,
        private notifyService: NotifyService
    ) {
    }


    getMetrics() {
        return this.httpGet(ApiConstant.METRICS);
    }

    logout() {
        return this.httpPost(ApiConstant.LOGOUT, {});
    }

    isAuthorized(): Observable<{ isLoggedIn: boolean }> {
        return this.httpGet(ApiConstant.AUTH_AUTHORIZED);
    }

    // private http

    private httpGet<T>(url: string) {
        return this.http.get<T>(url)
            .pipe(
                catchError(err => {
                    this.processError(err);
                    return throwError(err);
                })
            );
    }

    private httpPost<T>(url: string, data: any) {
        return this.http.post<T>(url, data)
            .pipe(
                catchError(err => {
                    this.processError(err);
                    return throwError(err);
                })
            );
    }

    private processError(err: HttpErrorResponse) {
        console.error(err);
        switch (err.status) {
            case 500: {
                this.notifyService.error('Ошибка на сервере!');
                break;
            }
            case 400: {
                this.notifyService.error('Ошибка в запросе!');
                break;
            }
            case 401: {
                this.notifyService.error('Доступ запрещен!');
                break;
            }
        }
    }
}
