import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule} from "@angular/router";
import { CallComponent } from "./components/call/call.component";
import { VideoPlayerComponent } from "./components/video-player/video-player.component";
import { PeerService } from "./services/peer.service";
import { SocketService } from "./services/socket.service";
import { HttpClientModule } from '@angular/common/http';
import {ChatComponent} from "./components/chat/chat.component";
import {ChatInputComponent} from "./components/chat/chat-input/chat-input.component";

@NgModule({
    declarations: [
        CallComponent,
        VideoPlayerComponent,
        ChatComponent,
        ChatInputComponent
    ],
    providers: [
        PeerService,
        SocketService
    ],
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: CallComponent
            }
        ]),
        CommonModule,
        FormsModule,
        HttpClientModule
    ],
    exports: [
        RouterModule
    ]
})
export class CallModule {

}