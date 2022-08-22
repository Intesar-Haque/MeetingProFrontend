import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule} from "@angular/router";
import { HttpClientModule } from '@angular/common/http';
import {DashboardComponent} from "./components/dashboard.component";

@NgModule({
    declarations: [
        DashboardComponent
    ],
    providers: [],
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: DashboardComponent
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
export class DashboardModule {

}
