import { Component } from '@angular/core';
import { AppUpdateService } from './service/app-update.service';
import { CheckForUpdateService } from './service/check-for-update.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(
        private checkForUpdate: CheckForUpdateService,
        private promptUpdate: AppUpdateService
    ) {
        checkForUpdate.monitorUpdates();
        promptUpdate.subscribeForUpdate();
    }

}
