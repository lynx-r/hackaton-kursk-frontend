import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';
import { VideoCallComponent } from './video-call/video-call.component';
import { DefaultCommonModule } from '../../core/default-common.module';
import { ComponentModule } from '../../component/component.module';


@NgModule({
    declarations: [VideoCallComponent],
    imports: [
        CommonModule,
        DoctorRoutingModule,

        DefaultCommonModule,
        ComponentModule,
    ]
})
export class DoctorModule {
}
