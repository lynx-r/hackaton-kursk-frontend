import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { SocketConstant } from '../config/socket-constant';

@Injectable({
    providedIn: 'root'
})
export class SocketService {

    socket: any;

    constructor() {
        this.socket = io('http://localhost:1234');
        this.socket.on('connect', () => this.connected());
        this.socket.on('disconnect', () => this.disconnected());
        this.socket.on('error', (error: string) => {
            console.log(`ERROR: "${error}" (${SocketConstant.HOST})`);
        });
    }

    disconnect() {
        this.socket.disconnect();
    }

    sendMessage(message) {
        this.socket.emit('message', message, (data) => console.log('resp', data));
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
