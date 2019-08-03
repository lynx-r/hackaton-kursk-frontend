import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoupleDeviceComponent } from './couple-device.component';

describe('CoupleDeviceComponent', () => {
    let component: CoupleDeviceComponent;
    let fixture: ComponentFixture<CoupleDeviceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CoupleDeviceComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CoupleDeviceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
