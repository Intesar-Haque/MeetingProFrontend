import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule} from "@angular/router";
import { HttpClientModule } from '@angular/common/http';
import {CalenderHomeComponent} from "./components/calender-home/calender-home.component";

@NgModule({
    declarations: [
        CalenderHomeComponent
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
        HttpClientModule
    ],
    exports: [
        RouterModule
    ]
})
export class CalenderModule {

}
