import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerRoutingModule } from './container-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { DefaultCommonModule } from '../core/default-common.module';

@NgModule({
    declarations: [LayoutComponent],
    imports: [
        CommonModule,
        ContainerRoutingModule,

        DefaultCommonModule
    ]
})
export class ContainerModule {
}
