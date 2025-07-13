import axios from 'axios';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class AxiosService {
    private axiosInstance = axios.create({
        baseURL: 'http://localhost:4000/api'
    })

    getMessages() {
        return this.axiosInstance.get('/messages');
    }

    sendMessage(message: string) {
        return this.axiosInstance.post('/messages', { message });
    }

    getRoomsMessages(room:string){
        return this.axiosInstance.get(`/messages/${room}`);
    }

    
}