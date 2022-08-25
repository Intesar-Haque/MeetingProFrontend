import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MediaService } from 'src/app/services/media.service';
import {BehaviorSubject, Subject} from "rxjs";
import Utils from "../../../../utils/utils";
@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
  providers: [MediaService]
})
export class VideoPlayerComponent implements AfterViewInit, OnInit {
  @ViewChild('videoPlayer') videoElement?: any;
  @Input() mode: 'view' | 'owner' = 'view';
  @Input() stream: MediaStream;
  @Input() username: string;
  @Input() notifyChange = new Subject<boolean>();
  @Input() localStreamControls = new BehaviorSubject(null);
  public isMute: boolean;
  public isHidden: boolean;
  public videoElementRef: any;
  noImage=''

  constructor(
    private mediaService: MediaService
  ) { }

  ngOnInit(): void {
    this.noImage = Utils.noImage
    this.mediaService.mode = this.mode;
    this.isMute = this.mediaService.isMuted();
    this.isHidden = this.mediaService.isVideoHidden();
  }

  ngAfterViewInit(): void {
    this.mediaService.stream = this.stream;
    this.videoElementRef = this.videoElement.nativeElement;
    if (this.mode === 'owner') {
      this.localStreamControls.subscribe({
        next:(value:string)=>{
          if(value){
            if(value=='video'){
              this.turnVideoOnOrOff()
            } else if(value=='audio'){
              this.muteOrUnMute()
            }
          }
        }
      })
      this.videoElementRef.muted = true;
    }
    this.playVideo();
    this.listenMediaControlChanges();
    this.notifyChange.subscribe({
      next:(res)=> {
        if (res){
          this.playVideo()
        }
      }
    })
  }

  public turnVideoOnOrOff(): void {
    this.mediaService.turnVideoOnOrOff()
  }

  public muteOrUnMute(): void {
    this.mediaService.muteOrUnMute();
  }

  private listenMediaControlChanges(): void {
    this.mediaService.isMute.subscribe(() => {
      this.isMute = this.mediaService.isMuted();
    })
    this.mediaService.isCameraOff.subscribe(() => {
      this.isHidden = this.mediaService.isVideoHidden();
    })
  }

  private playVideo() {
    if (this.videoElementRef &&  this.stream) {
      this.videoElementRef.srcObject = this.stream;
      this.videoElementRef.play();
    }
  }
}
