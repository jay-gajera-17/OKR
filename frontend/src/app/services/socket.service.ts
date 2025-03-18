import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class SocketService {
    private socket: Socket;

    constructor() {
        this.socket = io('http://localhost:4000', {
            transports: ['websocket', 'polling'],
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000
        });

        this.socket.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
        });
    }

    emit(event: string, data: any) {
        this.socket.emit(event, data);
    }

    on(event: string): Observable<any> {
        return new Observable((observer) => {
            this.socket.on(event, (data) => observer.next(data));
        });

        // return () => {
        //     this.socket.off(event);
        // };
    }
}