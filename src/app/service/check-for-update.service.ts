import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { first } from 'rxjs/operators';
import { concat, interval } from 'rxjs';

@Injectable()
export class CheckForUpdateService {

    constructor(
        private appRef: ApplicationRef,
        private updates: SwUpdate,
    ) {
    }

    monitorUpdates() {
        if (this.updates.isEnabled) {
            // Allow the app to stabilize first, before starting polling for updates with `interval()`.
            const appIsStable$ = this.appRef.isStable.pipe(first(isStable => isStable === true));
            const everySixHours$ = interval(6 * 60 * 60 * 1000);
            const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);

            everySixHoursOnceAppIsStable$.subscribe(() => this.updates.checkForUpdate());
        }
    }
}
