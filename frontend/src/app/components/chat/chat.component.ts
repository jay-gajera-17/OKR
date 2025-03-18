import { Component } from '@angular/core';
import { Message } from '../../../Interface/message';
import { MatCardModule } from '@angular/material/card';
import { ChatMessagesComponent } from '../chat-messages/chat-messages.component';
import { ChatInputComponent } from '../chat-input/chat-input.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [MatCardModule, ChatMessagesComponent, ChatInputComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  messages: Message[] = [];

  onSendMessage(message: string) {
    const newMessage: Message = {
      text: message,
      sender: 'User',
      timestamp: new Date()
    };
    this.messages.push(newMessage);
  }
}
