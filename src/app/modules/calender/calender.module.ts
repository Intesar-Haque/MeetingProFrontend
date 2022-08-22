import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RouterModule} from "@angular/router";
import { HttpClientModule } from '@angular/common/http';
import {CalenderHomeComponent} from "./components/calender-home/calender-home.component";
import { CreateScheduleModalComponent } from './components/create-schedule-modal/create-schedule-modal.component';
import {AngularMultiSelectModule} from "angular2-multiselect-dropdown";
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";

@NgModule({
    declarations: [
        CalenderHomeComponent,
        CreateScheduleModalComponent
    ],
    providers: [],
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: CalenderHomeComponent
            }
        ]),
        CommonModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        AngularMultiSelectModule,
        BsDatepickerModule
    ],
    exports: [
        RouterModule
    ]
})
export class CalenderModule {

}
