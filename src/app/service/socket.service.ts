import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { ApiConstant } from '../config/api-constant';

@Injectable({
    providedIn: 'root'
})
export class SocketService {

    socket: any;

    constructor() {
        this.socket = io(ApiConstant.WEBRTC_URL);
        this.socket.on('connect', () => this.connected());
        this.socket.on('disconnect', () => this.disconnected());
        this.socket.on('error', (error: string) => {
            console.log(`ERROR: "${error}" (${ApiConstant.WEBRTC_URL})`);
        });
    }

    disconnect() {
        this.socket.disconnect();
    }

    sendMessage(message) {
        this.socket.emit('message', message);
    }

    on(eventName, callback: (data: any) => void) {
        this.socket.on(eventName, callback);
    }

    private connected() {
        console.log('Connected');
    }

    private disconnected() {
        console.log('Disconnected');
    }
}
