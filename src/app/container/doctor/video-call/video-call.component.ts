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

    constructor(
        private webRtcService: WebRtcService
    ) {
    }

    ngOnInit() {
        this.webRtcService.getUserMedia();
        this.webRtcService.localStreamCreated$
            .subscribe(stream => (this.localVideoRef.nativeElement as HTMLVideoElement).srcObject = stream);
        this.webRtcService.remoteStreamCreated$
            .subscribe(stream => (this.remoteVideoRef.nativeElement as HTMLVideoElement).srcObject = stream);
    }

    createOffer() {
        this.webRtcService.createOffer();
    }

}
