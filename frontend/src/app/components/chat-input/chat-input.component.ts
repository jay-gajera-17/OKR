import { Component, EventEmitter, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, MatIconModule, FormsModule],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.css'
})
export class ChatInputComponent {

  @Output() sendMessage = new EventEmitter<string>();

  messageText = '';



 

  onSend() {
    if (this.messageText.trim()) {
      this.sendMessage.emit(this.messageText);
      this.messageText = '';
    }
  }

  onKeyPress(event:KeyboardEvent){
    if(event.key === 'Enter'){
      this.onSend();
    }
  }
}
