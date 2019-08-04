import { Component, OnInit } from '@angular/core';
import { Notification } from '../../../model/notification.model';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
    notifications: Notification[] = [
        {
            type: 'date',
            date: new Date()
        },
        {
            type: 'notification',
            title: 'Пора на прогулку!',
            description: 'Нужно пройти ещё 500 шагов',
            icon: '/assets/icons/footsteps-silhouette-variant.svg'
        },
        {
            type: 'notification',
            title: 'Лягте пораньше',
            description: 'Нормальный сон – 8 часов',
            icon: '/assets/icons/moon.svg'
        },
        {
            type: 'date',
            date: new Date()
        },
        {
            type: 'notification',
            title: 'Пора на прогулку!',
            description: 'Нужно пройти ещё 1 500 шагов',
            icon: '/assets/icons/footsteps-silhouette-variant.svg'
        },
        {
            type: 'notification',
            title: 'Лягте пораньше',
            description: 'Нормальный сон – 8 часов',
            icon: '/assets/icons/moon.svg'
        }, {
            type: 'date',
            date: new Date()
        },
        {
            type: 'notification',
            title: 'Пора на прогулку!',
            description: 'Нужно пройти ещё 500 шагов',
            icon: '/assets/icons/footsteps-silhouette-variant.svg'
        },
        {
            type: 'notification',
            title: 'Лягте пораньше',
            description: 'Нормальный сон – 8 часов',
            icon: '/assets/icons/moon.svg'
        },
        {
            type: 'date',
            date: new Date()
        },
        {
            type: 'notification',
            title: 'Пора на прогулку!',
            description: 'Нужно пройти ещё 1 500 шагов',
            icon: '/assets/icons/footsteps-silhouette-variant.svg'
        },
        {
            type: 'notification',
            title: 'Лягте пораньше',
            description: 'Нормальный сон – 8 часов',
            icon: '/assets/icons/moon.svg'
        },
    ];

    notificationsAll: Notification[] = [
        {
            type: 'date',
            date: new Date()
        },
        {
            type: 'notification',
            title: 'Заголовок 3',
            description: 'Описание 3',
            icon: ''
        },
        {
            type: 'date',
            date: new Date()
        },
        {
            type: 'notification',
            title: 'Заголовок 2',
            description: 'Описание 2',
            icon: ''
        },
    ];

    constructor() {
    }

    ngOnInit() {
    }

}
