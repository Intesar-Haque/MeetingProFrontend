import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import ApiEndpoint from "../../../utils/ApiEndpoint";
import {ConnectedUser} from "../models/user.model";
declare var Peer: any;
export interface CallUser {
  peerId: string;
  stream: MediaStream;
}
@Injectable()
export class PeerService {
  public peer;
  public myPeerId: string;
  public joinUser = new BehaviorSubject<ConnectedUser>(null);
  public leaveUser = new BehaviorSubject<string>(null);
  public localStream: MediaStream;
  public currentPeer: any;
  constructor(private http: HttpClient) { }

  getTurnServeConfig(): Observable<any> {
    return this.http.put(ApiEndpoint.TURN_URI, null,
      {
        headers: new HttpHeaders({ "Authorization": ApiEndpoint.TURN_AUTH })
      })
  }

  public openPeer(stream: MediaStream): Promise<string> {
    return new Promise<string>((resolve) => {
      this.getTurnServeConfig().subscribe(data => {
        this.initPeer(data.v);
        this.peer.on('open', (uerPeerId: string) => {
          this.myPeerId = uerPeerId
          this.handleInComingCall(stream);
          resolve(uerPeerId);
        })
      })
    });
  }

  public call(connectedUser: ConnectedUser, stream: MediaStream): void {
    let call = this.peer.call(connectedUser.peerId, stream);
    this.handelCall(call, connectedUser);
  }

  public handelCall(call: any, connectedUser: ConnectedUser): void {
    call.on('stream', (anotherStream: any) => {
      connectedUser.stream = anotherStream;
      this.joinUser.next(connectedUser);
      this.currentPeer = call.peerConnection;
    })
  }

  private handleInComingCall(stream: MediaStream): void {
    this.peer.on('call', call => {
      call.answer(stream);
      call.on('stream', (anotherStream: any) => {
        this.joinUser.next({ peerId: call.peer, stream: anotherStream });
        this.currentPeer = call.peerConnection;
      })
    })
  }

  private initPeer(config: any): void {
    this.peer = new Peer(this.myPeerId, ApiEndpoint.PEER_ENDPOINT);
  }

}
