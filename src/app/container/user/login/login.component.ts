import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    @ViewChild('loginForm', {static: false}) loginForm: NgForm;

    error: boolean;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
    }

    ngOnInit() {
    }

    onLogin() {
        this.authService.login(this.loginForm.value)
            .pipe(
                tap((logged) => {
                    if (logged) {
                        console.log(logged);
                        this.error = false;
                        this.router.navigate(['/']);
                    } else {
                        this.error = true;
                    }
                })
            )
            .subscribe();
    }

    print(password: any) {
        console.log(password);
    }
}
