import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NgxLocalStorageModule } from 'ngx-localstorage';
import { CookieModule } from 'ngx-cookie';
import { ApiInterceptor } from './service/api-interceptor';
import { ToastrModule } from 'ngx-toastr';
import { AppUpdateService } from './service/app-update.service';
import { CheckForUpdateService } from './service/check-for-update.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),

        NgxLocalStorageModule.forRoot(),
        CookieModule.forRoot(),
        ToastrModule.forRoot()
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ApiInterceptor,
            multi: true
        },
        AppUpdateService,
        CheckForUpdateService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
