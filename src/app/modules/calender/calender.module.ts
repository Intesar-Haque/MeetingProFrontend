import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule} from "@angular/router";
import { HttpClientModule } from '@angular/common/http';
import {CalenderHomeComponent} from "./components/calender-home/calender-home.component";
import { CreateScheduleModalComponent } from './components/create-schedule-modal/create-schedule-modal.component';
import {SharedModule} from "../../common-modules/shared.module";

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
        SharedModule,
        CommonModule,
        HttpClientModule,
    ],
    exports: [
        RouterModule
    ],
    entryComponents:[
        CreateScheduleModalComponent
    ]
})
export class CalenderModule {

}
