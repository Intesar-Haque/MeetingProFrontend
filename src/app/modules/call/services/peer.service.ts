import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import ApiEndpoint from "../../../utils/ApiEndpoint";
declare var Peer: any;
export interface CallUser {
  peerId: string;
  stream: MediaStream;
}
@Injectable()
export class PeerService {
  public peer;
  public myPeerId: string;
  public joinUser = new BehaviorSubject<CallUser>(null);
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

  public call(anotherPeerId: string, stream: MediaStream): void {
    var call = this.peer.call(anotherPeerId, stream);
    this.handelCall(call, anotherPeerId);
  }

  public handelCall(call: any, anotherPeerId: string): void {
    call.on('stream', (anotherStream: any) => {
      this.joinUser.next({ peerId: anotherPeerId, stream: anotherStream });
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
