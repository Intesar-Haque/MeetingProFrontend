import { NgModule } from "@angular/core";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {ModalModule} from 'ngx-bootstrap/modal';
import {BsDropdownConfig, BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {BsDatepickerConfig, BsDatepickerModule, DatepickerConfig, DatepickerModule} from "ngx-bootstrap/datepicker";
import {CommonModule} from "@angular/common";
import {AngularMultiSelectModule} from "angular2-multiselect-dropdown";
import {TimepickerModule} from "ngx-bootstrap/timepicker";

@NgModule({
    declarations: [],
    providers: [ BsDropdownConfig],
    imports: [
        CommonModule,
        BsDatepickerModule.forRoot(),
        TimepickerModule.forRoot(),
        BsDropdownModule,
        ModalModule,
        TooltipModule,
        AngularMultiSelectModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    exports: [
        CommonModule,
        BsDatepickerModule,
        BsDropdownModule,
        ModalModule,
        TooltipModule,
        AngularMultiSelectModule,
        ReactiveFormsModule,
        FormsModule,
    ]

})
export class SharedModule {

}
