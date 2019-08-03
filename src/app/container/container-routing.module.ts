import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
    {
        path: 'user',
        loadChildren: './user/user.module#UserModule'
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                loadChildren: './dashboard/dashboard.module#DashboardModule',
            },
            {
                path: 'notifications',
                loadChildren: './notification/notification.module#NotificationModule'
            },
            {
                path: 'profile',
                loadChildren: './profile/profile.module#ProfileModule'
            },
        ],
        //    canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContainerRoutingModule {
}
