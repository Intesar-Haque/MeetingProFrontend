import { AfterViewInit, Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import Utils from 'src/app/utils/utils';
import { CallUser, PeerService } from '../../services/peer.service';
import { SocketService } from '../../services/socket.service';
import {ConnectedUser} from "../../models/user.model";
import LocalStorageUtil from "../../../../utils/local-storage";
import {MediaService} from "../../services/media.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-meeting',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss'],
})
export class CallComponent implements OnInit, AfterViewInit {
  public joinedUsers: ConnectedUser[] = [];
  public localStream: MediaStream;
  public screenStream: MediaStream;
  public roomId: string = '';
  public isHideWhiteboard = true;
  public myName: string = '';
  public localStreamControls = new BehaviorSubject(null);
  public micMuted: boolean = false;
  public videoHidden: boolean = false;
  public isHideUsers = true;
  public isHideChat = true;
  public isHideShareScreen = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private socketService: SocketService,private router: Router,
    private peerService: PeerService,) { }

  ngAfterViewInit(): void {
    this.listenNewUser();
    this.listenLeavedUser();
    this.detectScreenWith();
  }

  ngOnInit(): void {
    this.roomId = this.activatedRoute.snapshot.paramMap.get('roomId');
    this.myName = LocalStorageUtil.getString('username')
    Utils.getMediaStream({ video: true, audio: true }).then(stream => {
      this.localStream = stream;
      this.openPeer();
    }).catch(()=>{
      this.openPeer()
    })
    this.socketService.hideWhiteboard.subscribe({next:(res:boolean)=>{if(res != undefined){this.isHideWhiteboard = res} }})
    this.socketService.isScreenShare.subscribe({
      next:(res:any)=>{
        console.log(res)
        if(res != undefined){
          this.isHideShareScreen = !res.display
          if(!this.isHideShareScreen){
            let idx = this.joinedUsers.findIndex(u => u.peerId === res.peerId)
            if(idx > -1){
              this.screenStream = this.joinedUsers[idx].stream
            }
          }
        }
      }
    })
  }

  hideOrUnhideChat(): void {
    this.isHideChat = !this.isHideChat;
    if(!this.isHideChat) this.isHideUsers = true
  }

  private detectScreenWith(): void {
    if (window.screen.width > 719) {
      setTimeout(() => {
        this.isHideChat = false;
      }, 200);
    }
  }

  private listenNewUser(): void {
    this.listenNewUserJoinRoom();
    this.listenNewUserStream();
  }

  private listenLeavedUser(): void {
    this.socketService.leavedId.subscribe(userPeerId => {
      this.joinedUsers = this.joinedUsers.filter(x => x.peerId != userPeerId);
    })
  }

  private listenNewUserJoinRoom(): void {
    this.socketService.joinedId.subscribe((connectedUser:ConnectedUser) => {
      if (connectedUser) {
        this.makeCall(connectedUser);
      }
    })
  }

  private listenNewUserStream(): void {
    this.peerService.joinUser.subscribe(user => {
      if (user) {
        if (this.joinedUsers.findIndex(u => u.peerId === user.peerId) < 0) {
          this.joinedUsers.push(user);
        }
      }
    })
  }

  private openPeer(): void {
    this.peerService.openPeer(this.localStream).then((myPeerId) => {
      this.joinRoom(this.roomId, myPeerId);
    })
  }

  private makeCall(connectedUser: ConnectedUser): void {
    this.peerService.call(connectedUser, this.localStream);
  }

  private joinRoom(roomId: string, userPeerId: string): void {
    this.socketService.joinRoom(roomId, userPeerId);
  }

  hangUp() {
    this.router.navigateByUrl(`/`)
  }

  screenShare(): void {
    Utils.getUserStream({  video: true, audio: true }).then(stream => {
      this.peerService.openPeer(stream).then((myPeerId) => {
        this.socketService.joinRoom(this.roomId, myPeerId);
      })
      this.isHideShareScreen = false
      this.socketService.shareScreen({peerId:this.peerService.myPeerId, display:true})
      this.screenStream = stream;
      const videoTrack = this.screenStream.getVideoTracks()[0];
      const sender = this.peerService.currentPeer.getSenders().find(s => s.track.kind === videoTrack.kind);
      sender.replaceTrack(videoTrack);
      videoTrack.onended = () => {
        this.stopScreenShare();
      };
    }).catch(err => {
      console.log('Unable to get display media ' + err);
    });
  }

  private stopScreenShare(): void {
    Utils.getMediaStream({ video: true, audio: true }).then(stream => {
      this.localStream = stream;
      this.isHideShareScreen = true
      this.socketService.shareScreen({peerId:this.peerService.myPeerId, display:false})
      const videoTrack = this.localStream.getVideoTracks()[0];
      const sender = this.peerService.currentPeer.getSenders().find(s => s.track.kind === videoTrack.kind);
      sender.replaceTrack(videoTrack);
    })
  }


  whiteboard() {
      this.isHideWhiteboard = !this.isHideWhiteboard
      this.socketService.whiteboard(this.isHideWhiteboard)
  }
  videoControls(){
    this.videoHidden=!this.videoHidden
    this.localStreamControls.next('video')
  }
  micControls(){
    this.micMuted=!this.micMuted
    this.localStreamControls.next('audio')

  }

  hideOrUnhideUsers() {
    this.isHideUsers = !this.isHideUsers;
    if(!this.isHideUsers) this.isHideChat = true
  }
}
