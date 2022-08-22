import { NgModule } from "@angular/core";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {ModalModule} from 'ngx-bootstrap/modal';
import {BsDropdownConfig, BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {BsDatepickerConfig, BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {CommonModule} from "@angular/common";
import {AngularMultiSelectModule} from "angular2-multiselect-dropdown";

@NgModule({
    declarations: [],
    providers: [ BsDatepickerConfig, BsDropdownConfig],
    imports: [
        CommonModule,
        BsDatepickerModule.forRoot(),
        BsDropdownModule,
        ModalModule,
        TooltipModule,
    ],
    exports: [
        CommonModule,
        BsDatepickerModule,
        BsDropdownModule,
        ModalModule,
        TooltipModule,
    ]

})
export class SharedModule {

}
