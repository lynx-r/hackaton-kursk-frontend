import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationDateComponent } from './notification-date.component';

describe('NotificationDateComponent', () => {
    let component: NotificationDateComponent;
    let fixture: ComponentFixture<NotificationDateComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NotificationDateComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NotificationDateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
