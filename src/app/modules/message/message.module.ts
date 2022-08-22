import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule} from "@angular/router";
import { HttpClientModule } from '@angular/common/http';
import {ChatHomeComponent} from "./components/chat-home/chat-home.component";

@NgModule({
    declarations: [
        ChatHomeComponent
    ],
    providers: [],
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: ChatHomeComponent
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
export class MessageModule {

}
