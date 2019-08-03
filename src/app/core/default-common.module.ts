import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatToolbarModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhoneValidatorsModule } from 'ngx-phone-validators';

@NgModule({
    declarations: [],
    imports: [],
    exports: [
        FlexLayoutModule,
        PhoneValidatorsModule,
        ReactiveFormsModule,
        FormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatCardModule,
        MatToolbarModule,
        MatBadgeModule,
        MatTabsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatChipsModule,
        MatCheckboxModule,
        MatSlideToggleModule
    ]
})
export class DefaultCommonModule {
}
