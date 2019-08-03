import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    devices = [
        {
            name: 'Тонометр',
            coupled: true
        },
        {
            name: 'Весы',
            coupled: true
        },
        {
            name: 'Умный браслет',
            coupled: false
        },
    ];

    constructor(
        private router: Router,
        private authService: AuthService,
    ) {
    }

    ngOnInit() {
    }

    onLogout() {
        this.authService.logout()
            .pipe(
                tap(() => this.router.navigate(['/user/login']))
            )
            .subscribe();
    }
}
