import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { SocketService } from 'src/app/modules/call/services/socket.service';
import { Chat } from '../../models/chat.model';
import LocalStorageUtil from "../../../../utils/local-storage";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  public chats: Chat[] = [];
  @Output() public isOpen = new EventEmitter<boolean>();
  public meetingLink = '';
  constructor(private socketService: SocketService) {
  }

  ngOnInit(): void {
    this.handleNewMessage();
    this.meetingLink = window.location.href
  }

  handleNewMessage(): void {
    this.socketService.newMessage.subscribe((message:Chat) => {
      if (message) {
        this.chats.push(message)
        this.scrollToNewMessage();
      }
    })
  }

  public addMessage(message: string): void {
    let payload = {name:LocalStorageUtil.getString('username'), content:message, time:new Date().toLocaleString(), isMe:false}
    this.socketService.chat(payload)
    payload.isMe = true
    this.chats.push(payload);
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
