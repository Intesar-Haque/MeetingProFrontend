import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {FormsModule} from "@angular/forms";
import {HomeComponent} from "./home.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {HomeRoutingModule} from "./home.routing.module";



@NgModule({
    declarations: [HomeComponent, DashboardComponent],
    imports: [HomeRoutingModule, FormsModule],

})
export class HomeModule {

}
