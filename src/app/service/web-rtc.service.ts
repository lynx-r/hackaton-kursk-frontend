import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { NotifyService } from './notify.service';
import { Subject } from 'rxjs';

declare var window: any;
declare var navigator: any;

@Injectable({
    providedIn: 'root'
})
export class WebRtcService {

    localStreamCreated$ = new Subject<any>();
    remoteStreamCreated$ = new Subject<any>();

    private getUserMedia: any;
    private readonly PeerConnection: any;
    private readonly IceCandidate: any;
    private readonly SessionDescription: any;
    private pc: any;
    private candidateId: string;

    constructor(
        private socketService: SocketService,
        private notifyService: NotifyService
    ) {
        this.PeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
        this.IceCandidate = window.mozRTCIceCandidate || window.RTCIceCandidate;
        this.SessionDescription = window.mozRTCSessionDescription || window.RTCSessionDescription;
        this.getUserMedia = navigator.mediaDevices.getUserMedia;
        this.onMessage();
    }

    // Step 1. getUserMedia
    async requestUserMedia() {
        const stream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
        this.gotStream(stream);
    }

    // Step 2. createOffer
    createOffer() {
        let configuration = {
            offerToReceiveAudio: true,
            offerToReceiveVideo: true,
            iceRestart: true,
            voiceActivityDetection: true
        };
        this.pc.createOffer(configuration)
            .then(description => {
                this.gotLocalDescription(description);
            })
            .catch(err => {
                console.log(err);
            });
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
        this.remoteStreamCreated$.next(event.streams[0]);
    }

    private gotStream(stream) {
        console.log('stream', stream);
        this.localStreamCreated$.next(stream);

        this.pc = new this.PeerConnection(null);
        this.pc.onicecandidate = this.gotIceCandidate.bind(this);

        this.pc.ontrack = this.gotRemoteStream.bind(this);
        stream.getTracks().forEach((track) => {
            this.pc.addTrack(track, stream);
        });
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
