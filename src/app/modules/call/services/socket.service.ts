import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import io, { Socket } from 'socket.io-client';
import ApiEndpoint from "../../../utils/ApiEndpoint";

@Injectable()
export class SocketService {
  public joinedId = new BehaviorSubject(null);
  public leavedId = new BehaviorSubject(null);
  public newMessage = new BehaviorSubject(null);
  public newDraw = new BehaviorSubject(null);
  public hideWhiteboard = new BehaviorSubject(null);
  public socket: Socket;

  constructor() {
    this.socket = io(ApiEndpoint.SOCKET_ENDPOINT, { path: '/socket' });
    this.hanleUserConnect();
    this.handleNewMessage();
    this.handleDraw();
    this.handleWhiteboard()
  }

  public joinRoom(roomId: string, userId: string): void {
    this.socket.emit('join-room', roomId, userId);
  }

  public chat(content: any): void {
    this.socket.emit('chat', content);
  }
  public draw(content: any[]): void {
    this.socket.emit('draw', content);
  }

  private hanleUserConnect(): void {
    this.socket.on('user-connected', userId => {
      this.joinedId.next(userId);
    })
    this.socket.on('user-disconnected', userId => {
      this.leavedId.next(userId);
    })
  }

  private handleNewMessage(): void {
    this.socket.on('new-message', (content) => {
      this.newMessage.next(content);
    })
  }

  private handleDraw(): void {
    this.socket.on('new-draw', (content) => {
      this.newDraw.next(content);
    })
  }

  whiteboard(isHideWhiteboard: boolean) {
    this.socket.emit('white-board', isHideWhiteboard);
  }
  private handleWhiteboard(): void {
    this.socket.on('hide-whiteboard', (content) => {
      this.hideWhiteboard.next(content);
    })
  }
}
