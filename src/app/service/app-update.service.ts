import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable()
export class AppUpdateService {

    constructor(
        private swUpdate: SwUpdate,
    ) {
    }

    subscribeForUpdate() {
        if (this.swUpdate.isEnabled) {
            this.swUpdate.available.subscribe(() => {
                this.swUpdate.activateUpdate().then(() => window.location.reload());
            });
        }
    }
}
