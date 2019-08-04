import { EventEmitter, Injectable } from '@angular/core';
import { SocketService } from './socket.service';

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

    constructor(
        private socketService: SocketService
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
        this.pc.setLocalDescription(description);
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
    }

    private onMessage() {
        this.socketService.on('message', (message) => {
                if (message.type === 'offer') {
                    this.pc.setRemoteDescription(new this.SessionDescription(message));
                    this.createAnswer();
                } else if (message.type === 'answer') {
                    this.pc.setRemoteDescription(new this.SessionDescription(message));
                } else if (message.type === 'candidate') {
                    const candidate = new this.IceCandidate({sdpMLineIndex: message.label, candidate: message.candidate});
                    this.pc.addIceCandidate(candidate);
                }
            }
        );
    }

}
