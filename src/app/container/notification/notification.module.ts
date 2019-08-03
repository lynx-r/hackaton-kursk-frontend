import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationComponent } from './notification/notification.component';
import { DefaultCommonModule } from '../../core/default-common.module';
import { ComponentModule } from '../../component/component.module';


@NgModule({
    declarations: [NotificationComponent],
    imports: [
        CommonModule,
        NotificationRoutingModule,

        DefaultCommonModule,
        ComponentModule
    ]
})
export class NotificationModule {
}
