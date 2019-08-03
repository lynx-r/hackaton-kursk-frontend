import { Component, Input, OnInit } from '@angular/core';
import { Device } from '../../model/device.model';

@Component({
    selector: 'app-couple-device',
    templateUrl: './couple-device.component.html',
    styleUrls: ['./couple-device.component.scss']
})
export class CoupleDeviceComponent implements OnInit {

    @Input() device: Device;

    constructor() {
    }

    ngOnInit() {
    }

}
