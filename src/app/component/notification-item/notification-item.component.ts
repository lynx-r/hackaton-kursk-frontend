import { Component, Input, OnInit } from '@angular/core';
import { Notification } from '../../model/notification.model';

@Component({
    selector: 'app-notification-item',
    template: `
        <div fxLayout="row" class="notification" fxLayoutGap="12px">
            <div>
                <img width="28" [src]="notification.icon" alt="">
            </div>
            <div>
                <p>{{notification.title}}</p>
                <div>{{notification.description}}</div>
            </div>
        </div>
    `,
    styles: [`
        .notification {
            border-radius: 12px;
            padding: 24px;
            width: 100%;
            background-color: white;
            margin-top: 6px;
            margin-bottom: 6px;
        }
    `]
})
export class NotificationItemComponent implements OnInit {

    @Input() notification: Notification;

    constructor() {
    }

    ngOnInit() {
    }

}
