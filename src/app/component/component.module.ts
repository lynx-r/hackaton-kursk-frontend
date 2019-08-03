import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationItemComponent } from './notification-item/notification-item.component';
import { NotificationDateComponent } from './notification-date/notification-date.component';
import { DefaultCommonModule } from '../core/default-common.module';
import { CoupleDeviceComponent } from './couple-device/couple-device.component';

const COMPONENTS = [
    NotificationItemComponent,
    NotificationDateComponent,
    CoupleDeviceComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    exports: [...COMPONENTS],
    imports: [
        CommonModule,
        DefaultCommonModule
    ]
})
export class ComponentModule {
}
