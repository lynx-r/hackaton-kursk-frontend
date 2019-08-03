import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { DefaultCommonModule } from '../../core/default-common.module';
import { NgxMaskModule } from 'ngx-mask';
import { ComponentModule } from '../../component/component.module';


@NgModule({
    declarations: [ProfileComponent],
    imports: [
        CommonModule,
        ProfileRoutingModule,

        DefaultCommonModule,

        NgxMaskModule.forRoot(),

        ComponentModule,
    ]
})
export class ProfileModule {
}
