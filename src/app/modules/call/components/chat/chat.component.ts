import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { SocketService } from 'src/app/modules/call/services/socket.service';
import { Chat } from '../../models/chat.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  public chats: Chat[] = [];
  @Output() public isOpen = new EventEmitter<boolean>();
  constructor(private socketService: SocketService) {
  }

  ngOnInit(): void {
    this.handleNewMessage();
    this.addshareLinkMessage();
  }

  addshareLinkMessage(): void {
    this.addMessage(`Share this link to your friend to start video call ${window.location.href}`);
  }

  handleNewMessage(): void {
    this.socketService.newMessage.subscribe(message => {
      if (message) {
        this.chats.push({ content: message })
        this.scrollToNewMessage();
      }
    })
  }

  public addMessage(message: string): void {
    this.socketService.chat(message)
    this.chats.push({ content: message, isMe: true });
    this.scrollToNewMessage();
  }

  private scrollToNewMessage(): void {
    setTimeout(() => {
      const lastMessage = document.getElementById(`${this.chats.length - 1}`);
      if (lastMessage) {
        lastMessage.scrollIntoView();
      }
    }, 200)
  }

}
