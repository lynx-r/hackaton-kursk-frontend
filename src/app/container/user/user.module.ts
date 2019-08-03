import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DefaultCommonModule } from '../../core/default-common.module';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
    declarations: [LoginComponent, RegisterComponent],
    imports: [
        CommonModule,
        UserRoutingModule,

        DefaultCommonModule,
        NgxMaskModule.forRoot()
    ]
})
export class UserModule {
}
