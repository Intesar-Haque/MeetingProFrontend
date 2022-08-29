import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import Utils from 'src/app/utils/utils';
import { CallUser, PeerService } from '../../../../services/peer.service';
import { SocketService } from '../../../../services/socket.service';
import {ConnectedUser} from "../../models/user.model";
import LocalStorageUtil from "../../../../utils/local-storage";
import {MediaService} from "../../../../services/media.service"
import {BehaviorSubject, Subject} from "rxjs";
import {MeetingService} from "../../../../services/meeting.service";
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import {CreateJoinModalComponent} from "../../../group/components/create-join-modal/create-join-modal.component";
import {MeetingJoinModalComponent} from "../meeting-join-modal/meeting-join-modal.component";
import {AlertService} from "../../../../services/alert.service";

@Component({
  selector: 'app-meeting',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit, OnDestroy {
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
  public iAmSharingScreen = false;
  public modalRef: BsModalRef;
  public peerId: string;
  @ViewChild('videoPlayer') videoElement?: any;
  hasAllPermission: boolean = false;
  permissions: {
    whiteboard?:boolean;
    screenShare?:boolean;
    draw?:boolean;
  } = {};
  preExistingUsers: any [] = [];
  selectedIdx: number = -1;
  focusedUser:ConnectedUser;

  constructor(
    private activatedRoute: ActivatedRoute,
    private socketService: SocketService,private router: Router,
    private peerService: PeerService,
    private meetingService:MeetingService,
    private modalService:BsModalService, private alertService:AlertService) { }

  ngOnInit(): void {
    this.roomId = this.activatedRoute.snapshot.paramMap.get('roomId');
    this.myName = LocalStorageUtil.getString('username')
    if(this.myName == undefined){
      const initialState: ModalOptions = {
        initialState: {} as Partial<Object> ,
        class: 'modal-l',
        ignoreBackdropClick:true
      };
      this.modalRef = this.modalService.show(MeetingJoinModalComponent, initialState);
      this.modalRef.content.nameUpdateEvent.subscribe(res => {
        this.myName = res
        LocalStorageUtil.setInfo('username',res)
        this.startMeeting()
      })
    } else {
      this.startMeeting()
    }
  }

  ngOnDestroy(): void {
    this.localStream.getTracks().forEach((track)=>track.stop());
    this.meetingService.leaveMeeting(this.peerId).subscribe()
  }


  //--- Action Buttons ---//
  public controlChat(): void {
    this.isHideChat = !this.isHideChat;
    if(!this.isHideChat) this.isHideUsers = true
  }
  public controlUserList(): void  {
    this.isHideUsers = !this.isHideUsers;
    if(!this.isHideUsers) this.isHideChat = true
  }
  public controlVideo(){
    this.videoHidden=!this.videoHidden
    this.localStreamControls.next('video')
  }
  public controlMic(){
    this.micMuted=!this.micMuted
    this.localStreamControls.next('audio')
  }
  public controlWhiteboard() {
    this.isHideWhiteboard = !this.isHideWhiteboard
    this.handleWhiteboardFocus()
    this.socketService.whiteboard(this.isHideWhiteboard)
  }
  public controlScreenShare(): void {
    if(this.isHideShareScreen){
      this.startScreenShare();
    } else {
      this.stopScreenShare();
    }
  }
  public controlMeeting() {
    this.localStream.getTracks().forEach((track)=>track.stop());
    this.meetingService.leaveMeeting(this.peerId).subscribe()
    this.router.navigateByUrl(`/`)
  }

  //--- Permissions ----//
  public hasWhiteboardPermission() :boolean{
    return this.hasAllPermission || this.permissions.whiteboard;
  }
  public hasWhiteboardDrawPermission() :boolean{
    return this.hasAllPermission || this.permissions.whiteboard || this.permissions.draw;
  }
  public hasScreenSharePermission() :boolean{
    return this.hasAllPermission || this.permissions.screenShare;
  }

  //--- SOCKET ----//
  private openSocket(){
    this.listenNewUserJoinRoom();
    this.listenNewUserStream();
    this.listenLeavedUser();
    this.listenToWhiteboard();
    this.listenToScreenShare();
  }
  private listenToWhiteboard() : void {
    this.socketService.hideWhiteboard.subscribe({
      next:(res:boolean)=>{
        if(res != undefined){
          this.isHideWhiteboard = res
          this.handleWhiteboardFocus()
        }
      }
    })
  }
  private listenToScreenShare() : void {
    this.socketService.isScreenShare.subscribe({
      next:(res:any)=>{
        if(res != undefined){
          this.isHideShareScreen = !res.display
          if(this.isHideShareScreen){
            this.clearPrevFocus()
            this.initFocus()
          } else {
            this.focusStream(res.peerId)
          }
        }
      }
    })
  }
  private listenLeavedUser(): void {
    this.socketService.leavedId.subscribe(userPeerId => {
      if(userPeerId){
        this.joinedUsers = this.joinedUsers.filter(x => x.peerId != userPeerId);
        if(this.focusedUser && this.focusedUser.peerId == userPeerId){
          this.clearPrevFocus()
          this.initFocus()
        }
      }
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
      if(user && user.peerId && this.joinedUsers.findIndex(u => u.peerId === user.peerId) < 0) {
        if(user.name == undefined){
          let idx = this.preExistingUsers.findIndex(u => u.peerId === user.peerId)
          if(idx > -1) { user.name = this.preExistingUsers[idx].name }
        }
        this.joinedUsers.push(user)
      }
      if(!this.focusedUser){
        this.initFocus()
      }
    })
  }

  //--- Helpers ---//
  // Handle Call
  private startMeeting(){
    this.alertService.loading()
    this.peerId = Utils.genRoomId();
    let formData = new FormData();
    formData.append('peerId', this.peerId)
    formData.append('meetingCode', this.roomId)
    if(this.myName){
      formData.append('displayName', this.myName)
    }
    if(LocalStorageUtil.getString('id')){
      formData.append('userId',LocalStorageUtil.getString('id') )
    }

    this.meetingService.joinMeeting(formData).subscribe({
      next:(response)=>{
        this.alertService.closeAlert()
        if(response){
          this.preExistingUsers = response['joinedUsers']
          this.hasAllPermission = response['isMeetingCreator']
          Utils.getMediaStream()
              .then((stream)=> this.init(stream))
              .catch(()=> this.init(new MediaStream()))
        }
      }
    })
  }
  private init(stream:MediaStream){
    this.localStream = stream;
    this.peerService.openPeer(stream, this.peerId).then((myPeerId) => {
      this.socketService.joinRoom(this.roomId, myPeerId);
    })
    this.openSocket()
  }
  private makeCall(connectedUser: ConnectedUser): void {
    this.peerService.call(connectedUser, this.localStream);
  }

  // Handle ScreenShare
  private startScreenShare(): void {
    Utils.getUserStream().then(stream => {
          // this.peerService.openPeer(stream, this.peerId).then((myPeerId) => {
          //   this.socketService.joinRoom(this.roomId, myPeerId);
          // })
          this.clearPrevFocus()
          this.isHideShareScreen = false
          this.socketService.shareScreen({peerId:this.peerService.myPeerId, display:true})
          this.screenStream = stream;
          const videoTrack = this.screenStream.getVideoTracks()[0];
          const sender = this.peerService.currentPeer.getSenders().find(s => s.track.kind === videoTrack.kind);
          sender.replaceTrack(videoTrack);
          videoTrack.onended = () => {
            this.stopScreenShare();
          };
        })
        .catch(err =>
            console.log('Unable to get display media ' + err)
        );
  }
  private stopScreenShare(): void {
    this.screenStream.getTracks().forEach((track)=>track.stop());
    this.isHideShareScreen = true
    this.socketService.shareScreen({peerId:this.peerService.myPeerId, display:false})
    const videoTrack = this.localStream.getVideoTracks()[0];
    const sender = this.peerService.currentPeer.getSenders().find(s => s.track.kind === videoTrack.kind);
    sender.replaceTrack(videoTrack);
    this.initFocus()
  }

  // Handle Focus
  public focusStream(peerId) {
    this.joinedUsers.forEach(user=>{
      if(user.peerId == peerId){
        this.focusedUser = user;
        user.isFocused = true;
      } else {
        user.isFocused = false;
      }
    })
    this.screenStream = this.focusedUser.stream
  }
  private clearPrevFocus(){
    if(this.focusedUser){
      this.joinedUsers.forEach(user=>{
        if(this.focusedUser.peerId == user.peerId){
          user.isFocused = false;
        }
      })
      this.focusedUser = null;
      this.screenStream = null;
    }
  }
  private initFocus(idx=0){
    if(this.joinedUsers.length > idx){
      this.focusedUser = this.joinedUsers[idx]
      this.joinedUsers[idx].isFocused = true
      this.screenStream = this.joinedUsers[idx].stream
    }
  }
  private handleWhiteboardFocus(){
    if(this.isHideWhiteboard){
      this.initFocus()
    } else {
      this.clearPrevFocus()
    }
  }
}
