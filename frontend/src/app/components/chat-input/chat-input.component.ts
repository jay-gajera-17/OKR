import { Component, EventEmitter, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, MatIconModule, FormsModule],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.css'
})
export class ChatInputComponent {

  constructor(private socketService: SocketService) {
    this.socketService.on('message').subscribe((message: any) => {
       this.sendMessage.emit(message.text);
    });
  }
  

  @Output() sendMessage = new EventEmitter<string>();
  messageText = '';

  onSend() {
    if (this.messageText.trim()) {
      this.socketService.emit('message', {text:this.messageText} );
     // this.sendMessage.emit(this.messageText);
      this.messageText = '';
    }
  }
}
