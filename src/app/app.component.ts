import { Component, OnInit } from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(
        private swUpdate: SwUpdate,
        private swPush: SwPush,
    ) {
    }

    ngOnInit(): void {
        if (this.swUpdate.isEnabled) {
            this.swUpdate.available.subscribe(() => {
                window.location.reload();
            });
        }
    }

}
