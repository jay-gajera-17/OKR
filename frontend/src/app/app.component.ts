import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from './components/chat/chat.component';
import { ChatMessagesComponent } from './components/chat-messages/chat-messages.component';
import { ChatInputComponent } from './components/chat-input/chat-input.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    ChatComponent,
    ChatMessagesComponent,
    ChatInputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'chat-app';
}
