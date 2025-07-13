import { Component } from '@angular/core';
import { Message } from '../../../Interface/message';
import { MatCardModule } from '@angular/material/card';
import { ChatMessagesComponent } from '../chat-messages/chat-messages.component';
import { ChatInputComponent } from '../chat-input/chat-input.component';
import { Subscription } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SocketService } from '../../services/socket.service';
import { AxiosService } from '../../services/axios.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [MatCardModule, ChatMessagesComponent, ChatInputComponent, MatInputModule,
    MatButtonModule,
    FormsModule,
    CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  messages: Message[] = [];
  currentUserName:string = '';
  currentRoom:string = 'general';
  
  private messageSubscription:Subscription = new Subscription();
  
  constructor(private socketService:SocketService,private axiosService:AxiosService){}

  ngOnInit():void{
    this.currentUserName = 'User_' + Math.floor(Math.random() * 1000);
    this.messageSubscription = this.socketService.onMessage().subscribe((message:Message)=>{
      this.messages.push({
        id:message.id,
        username:message.username,
        message:message.message,
        timestamp: new Date(message.timestamp),
        room:message.room
      });
    })


  }

  loadChatHistory():void{
    this.axiosService.getRoomsMessages(this.currentRoom).then((response:any)=>{
      this.messages = response.data.map((message:any)=>({
        id:message._id,
        username:message.username,
        message:message.message,
        timestamp: new Date(message.timestamp),
        room:message.room
      }))
    })
  }

  ngOnDestroy():void{
    this.messageSubscription.unsubscribe();
  }

  onSendMessage(message: string) {
    if (message.trim() && this.currentUserName.trim()) {
      this.socketService.sendMessage(this.currentUserName, message, this.currentRoom);
    }
  }

  onRoomChange():void{
    this.messages = [];
    this.socketService.joinRoom(this.currentRoom);
    this.loadChatHistory();
  }
}
