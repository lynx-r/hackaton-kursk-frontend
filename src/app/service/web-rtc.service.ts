import { EventEmitter, Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { NotifyService } from './notify.service';

declare var window: any;
declare var navigator: any;

@Injectable({
    providedIn: 'root'
})
export class WebRtcService {

    localStreamCreated$ = new EventEmitter<any>();
    remoteStreamCreated$ = new EventEmitter<any>();

    private Navigator: any;
    private readonly PeerConnection: any;
    private readonly IceCandidate: any;
    private readonly SessionDescription: any;
    private pc: any;
    private candidateId: string;

    constructor(
        private socketService: SocketService,
        private notifyService: NotifyService
    ) {
        this.Navigator = navigator;
        this.PeerConnection = window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
        this.IceCandidate = window.mozRTCIceCandidate || window.RTCIceCandidate;
        this.SessionDescription = window.mozRTCSessionDescription || window.RTCSessionDescription;
        this.Navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;
        this.onMessage();
    }

    // Step 1. getUserMedia
    getUserMedia() {
        this.Navigator.getUserMedia(
            {audio: false, video: true},
            this.gotStream.bind(this),
            (error) => {
                console.log(error);
            }
        );
    }

    // Step 2. createOffer
    createOffer() {
        this.pc.createOffer(
            this.gotLocalDescription.bind(this),
            (error) => {
                console.log(error);
            },
            {mandatory: {OfferToReceiveAudio: true, OfferToReceiveVideo: true}}
        );
    }

    // Step 3. createAnswer
    private createAnswer() {
        this.pc.createAnswer(
            this.gotLocalDescription.bind(this),
            (error) => {
                console.log(error);
            },
            {mandatory: {OfferToReceiveAudio: true, OfferToReceiveVideo: true}}
        );
    }

    private gotLocalDescription(description) {
        this.pc.setLocalDescription(description)
            .then((m) => console.log('localdesc', m))
            .catch(err => console.log('localdesc err', err));
        this.socketService.sendMessage(description);
    }

    private gotIceCandidate(event) {
        if (event.candidate) {
            this.socketService.sendMessage({
                type: 'candidate',
                label: event.candidate.sdpMLineIndex,
                id: event.candidate.sdpMid,
                candidate: event.candidate.candidate
            });
        }
    }

    private gotRemoteStream(event) {
        this.remoteStreamCreated$.emit(event.stream);
    }

    private gotStream(stream) {
        this.localStreamCreated$.emit(stream);

        this.pc = new this.PeerConnection(null);
        this.pc.addStream(stream);
        this.pc.onicecandidate = this.gotIceCandidate.bind(this);
        this.pc.onaddstream = this.gotRemoteStream.bind(this);
        // let isNegotiating = false;  // Workaround for Chrome: skip nested negotiations
        // this.pc.onnegotiationneeded = e => {
        //     if (isNegotiating) {
        //         console.log("SKIP nested negotiations");
        //         return;
        //     }
        //     isNegotiating = true;
        //     console.log('onnegotiationneeded', e)
        // };
        // this.pc.onsignalingstatechange = e => {
        //     console.log('onsignalingstatechange', e)
        // };
    }

    private onMessage() {
        this.socketService.on('message', (message) => {
                if (message.type === 'offer') {
                    console.log('o', message);
                    this.pc.setRemoteDescription(new this.SessionDescription(message));
                    this.createAnswer();
                } else if (message.type === 'answer') {
                    console.log('a', message);
                    this.pc.setRemoteDescription(new this.SessionDescription(message))
                        .then(m => console.log('answer', m))
                        .catch(err => {
                            console.log('answer err', err);
                            this.notifyService.error('Ошибка соединения. Больше двух кандидатов.');
                        });
                } else if (message.type === 'candidate' && this.candidateId !== message.id) {
                    console.log('c', message);
                    this.candidateId = message.id;
                    const candidate = new this.IceCandidate({sdpMLineIndex: message.label, candidate: message.candidate});
                    this.pc.addIceCandidate(candidate);
                }
            }
        );
    }

}
