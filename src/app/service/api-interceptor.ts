import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('req');
        let clonedRequest = req.clone();
        const token = this.authService.token;
        if (!!token) {
            console.log(1);
            clonedRequest = clonedRequest.clone(
                {
                    headers:
                        clonedRequest.headers
                            .append('Authorization', 'Bearer ' + token)
                }
            );
        }
        return next.handle(clonedRequest);
    }
}
