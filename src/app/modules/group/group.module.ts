import { NgModule } from "@angular/core";
import {FormsModule} from "@angular/forms";
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {ModalModule} from 'ngx-bootstrap/modal';
import {BsDropdownConfig, BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {BsDatepickerConfig, BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {GroupHomeComponent} from "./components/group-home/group-home.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

@NgModule({
    declarations: [
        GroupHomeComponent
    ],
    providers: [ BsDatepickerConfig, BsDropdownConfig],
    imports: [
        FormsModule,
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: GroupHomeComponent
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
export class GroupModule {

}
