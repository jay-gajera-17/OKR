import { Component, Input } from '@angular/core';
import { Message } from '../../../Interface/message';
import { MatListModule } from '@angular/material/list';
import { CommonModule, DatePipe } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-chat-messages',
  standalone: true,
  imports: [MatListModule, CommonModule,DatePipe, MatDividerModule],
  templateUrl: './chat-messages.component.html',
  styleUrl: './chat-messages.component.css'
})
export class ChatMessagesComponent {
  @Input() messages: Message[] = [];
}
