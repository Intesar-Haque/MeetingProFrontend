import { NgModule } from "@angular/core";
import {FormsModule} from "@angular/forms";
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {ModalModule} from 'ngx-bootstrap/modal';
import {BsDropdownConfig, BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {BsDatepickerConfig, BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {RoomComponent} from "../meeting/components/room/room.component";
import {CallHomeComponent} from "./components/call-home/call-home.component";
import {MeetingCreateModalComponent} from "./components/meeting-create-modal/meeting-create-modal.component";
import {SharedModule} from "../../common-modules/shared.module";



@NgModule({
    declarations: [
        CallHomeComponent,MeetingCreateModalComponent
    ],
    providers: [ BsDatepickerConfig, BsDropdownConfig],
    imports: [
        FormsModule,
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: CallHomeComponent
            }
        ]),
        BsDatepickerModule.forRoot(),
        BsDropdownModule,
        ModalModule,
        TooltipModule,
        SharedModule,
    ],
    exports: [
        RouterModule
    ],
    entryComponents:[
        MeetingCreateModalComponent
    ]

})
export class CallModule {

}
