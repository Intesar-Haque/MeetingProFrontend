import { NgModule } from "@angular/core";
import {FormsModule} from "@angular/forms";
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {ModalModule} from 'ngx-bootstrap/modal';
import {BsDropdownConfig, BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {BsDatepickerConfig, BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {CallComponent} from "../meeting/components/call/call.component";
import {CallHomeComponent} from "./components/call-home/call-home.component";



@NgModule({
    declarations: [
        CallHomeComponent
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
    ],
    exports: [
        RouterModule
    ]

})
export class CallModule {

}
