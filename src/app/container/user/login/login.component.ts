import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    @ViewChild('loginForm', {static: false}) loginForm: NgForm;

    error: boolean;
    russianSymbols: boolean;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
    }

    ngOnInit() {
    }

    onLogin(event) {
        if (this.loginForm.valid) {
            event.preventDefault();
            this.authService.login(this.loginForm.value)
                .pipe(
                    tap((logged) => {
                        if (logged) {
                            this.error = false;
                            this.router.navigate(['/']);
                        } else {
                            this.error = true;
                        }
                    })
                )
                .subscribe();
        }
    }

    onKeyup(password: string) {
        const re = /([а-я]|[А-Я])+/g;
        const a = password.match(re);
        this.russianSymbols = a !== null;
    }
}
