import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import io, { Socket } from 'socket.io-client';
import ApiEndpoint from "./ApiEndpoint";
import {ConnectedUser} from "../modules/meeting/models/user.model";
import LocalStorageUtil from "../utils/local-storage";

@Injectable()
export class SocketService {
  public joinedId = new BehaviorSubject(null);
  public leavedId = new BehaviorSubject(null);
  public newMessage = new BehaviorSubject(null);
  public newDraw = new BehaviorSubject(null);
  public hideWhiteboard = new BehaviorSubject(null);
  public isScreenShare = new BehaviorSubject(null);
  public socket: Socket;

  constructor() {
    this.socket = io(ApiEndpoint.SOCKET_ENDPOINT, { path: '/socket' });
    this.hanleUserConnect();
    this.handleNewMessage();
    this.handleDraw();
    this.handleWhiteboard()
    this.handleScreenShare()
  }

  public joinRoom(roomId: string, userId: string): void {
    let connectedUser:ConnectedUser =  {
      id: 0,
      name: LocalStorageUtil.getString('username'),
      peerId:userId
    };
    this.socket.emit('join-room', roomId, connectedUser);
  }

  public chat(content: any): void {
    this.socket.emit('chat', content);
  }
  public draw(content: any[]): void {
    this.socket.emit('draw', content);
  }

  private hanleUserConnect(): void {
    this.socket.on('user-connected', (connectedUser:ConnectedUser) => {
      this.joinedId.next(connectedUser);
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


  shareScreen(content) {
    this.socket.emit('share-screen', content);
  }
  private handleScreenShare(): void {
    this.socket.on('on-share-screen', (content:any) => {
      this.isScreenShare.next(content);
    })
  }
}
