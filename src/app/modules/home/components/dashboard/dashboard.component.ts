import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Utils from 'src/app/utils/utils';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private router: Router) { }
  roomId:string;

  public createRoom(): void {
    const roomId = Utils.genRoomId();
    this.router.navigateByUrl(`/call/${roomId}`)
  }

  joinRoom() {
    this.router.navigateByUrl(`/call/${this.roomId}`)

  }
}
