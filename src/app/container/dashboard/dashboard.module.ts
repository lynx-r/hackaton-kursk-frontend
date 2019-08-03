import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DefaultCommonModule } from '../../core/default-common.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
    declarations: [DashboardComponent],
    imports: [
        CommonModule,
        DashboardRoutingModule,

        NgxChartsModule,

        DefaultCommonModule
    ]
})
export class DashboardModule {
}
