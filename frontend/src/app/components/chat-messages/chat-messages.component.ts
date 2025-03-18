import { Component, Input } from '@angular/core';
import { Message } from '../../../Interface/message';
import { MatListModule } from '@angular/material/list';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-chat-messages',
  standalone: true,
  imports: [MatListModule, CommonModule],
  templateUrl: './chat-messages.component.html',
  styleUrl: './chat-messages.component.css'
})
export class ChatMessagesComponent {
  @Input() messages: Message[] = [];
}
