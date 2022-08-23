import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Chat} from "../../models/chat.model";
import {SocketService} from "../../../../services/socket.service";
import LocalStorageUtil from "../../../../utils/local-storage";
import {CallUser} from "../../../../services/peer.service";
import {ConnectedUser} from "../../models/user.model";
import {MediaIconUrl} from "../../data/media-icon";
import Utils from "../../../../utils/utils";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  @Input() public users: ConnectedUser[] = [];
  @Input() public myName: string = '';
  @Output() public isOpen = new EventEmitter<boolean>();
  noImage:string;
  constructor() {
  }

  ngOnInit(): void {
    this.noImage = Utils.noImage
  }

}
