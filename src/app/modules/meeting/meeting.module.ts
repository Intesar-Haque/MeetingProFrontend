import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RouterModule} from "@angular/router";
import { RoomComponent } from "./components/room/room.component";
import { VideoPlayerComponent } from "./components/video-player/video-player.component";
import { PeerService } from "../../services/peer.service";
import { SocketService } from "../../services/socket.service";
import { HttpClientModule } from '@angular/common/http';
import {ChatComponent} from "./components/chat/chat.component";
import {ChatInputComponent} from "./components/chat/chat-input/chat-input.component";
import { WhiteBoardComponent } from './components/white-board/white-board.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { MeetingJoinModalComponent } from './components/meeting-join-modal/meeting-join-modal.component';
import { MeetingCreateModalComponent } from '../call/components/meeting-create-modal/meeting-create-modal.component';

@NgModule({
    declarations: [
        RoomComponent,
        VideoPlayerComponent,
        ChatComponent,
        ChatInputComponent,
        WhiteBoardComponent,
        UserListComponent,
        MeetingJoinModalComponent
    ],
    providers: [
        PeerService,
        SocketService
    ],
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: RoomComponent
            }
        ]),
        CommonModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    exports: [
        RouterModule
    ],
    entryComponents:[
        MeetingJoinModalComponent
    ]
})
export class MeetingModule {

}
