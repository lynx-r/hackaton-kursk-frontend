import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-notification-date',
    template: `
        <div fxLayout="row">
            <div class="date" fxFlex="nogrow">
                {{date | date:'dd.MM.yyyy'}}
            </div>
        </div>
    `,
    styles: [`
        .date {
            border-radius: 8px;
            padding: 4px;
            color: darkgray;
            background-color: #025031;
            margin-top: 6px;
            margin-bottom: 6px;
        }
    `]
})
export class NotificationDateComponent implements OnInit {

    @Input() date: Date;

    constructor() {
    }

    ngOnInit() {
    }

}
