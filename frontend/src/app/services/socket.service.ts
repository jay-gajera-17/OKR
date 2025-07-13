import { Injectable } from "@angular/core";
import { io, Socket } from "socket.io-client";
import { Observable } from "rxjs";
import { Message } from "../../Interface/message";

@Injectable({
  providedIn: "root",
})
export class SocketService {
  private socket: Socket;
  private currentRoom: string = "general";

  constructor() {
    this.socket = io("http://localhost:4000", {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    this.socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    this.socket.on("connect", () => {
      this.joinRoom(this.currentRoom);
    });
  }

  joinRoom(room: string) {
    this.currentRoom = room;
    this.socket.emit("joinRoom", room);
  }

  emit(event: string, data: any) {
    this.socket.emit(event, data);
  }

  sendMessage(username: string, message: string, room: string) {
    const messageData = {
      username,
      message,
      room,
    };
    this.socket.emit("sendMessage", messageData);
  }

  onMessage(): Observable<Message> {
    return new Observable((observer) => {
      this.socket.on("receiveMessage", (data: Message) => observer.next(data));
    });
  }

  on(event: string): Observable<any> {
    return new Observable((observer) => {
      this.socket.on(event, (data) => observer.next(data));
    });
  }

  getCurrentRoom(): string {
    return this.currentRoom;
  }
}
