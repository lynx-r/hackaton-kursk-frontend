import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WebRtcService } from '../../../service/web-rtc.service';

@Component({
    selector: 'app-video-call',
    templateUrl: './video-call.component.html',
    styleUrls: ['./video-call.component.scss']
})
export class VideoCallComponent implements OnInit {

    @ViewChild('localVideo', {static: false}) localVideoRef: ElementRef;
    @ViewChild('remoteVideo', {static: false}) remoteVideoRef: ElementRef;

    haveLocalPermissions: boolean;

    constructor(
        private webRtcService: WebRtcService
    ) {
    }

    ngOnInit() {
        this.webRtcService.localStreamCreated$
            .subscribe(stream => {
                this.haveLocalPermissions = true;
                (this.localVideoRef.nativeElement as HTMLVideoElement).srcObject = stream;
            });
        this.webRtcService.remoteStreamCreated$
            .subscribe(stream => (this.remoteVideoRef.nativeElement as HTMLVideoElement).srcObject = stream);
    }

    async requestPermissions() {
        await this.webRtcService.requestUserMedia();
    }

    createOffer() {
        this.webRtcService.createOffer();
    }

}
