import { NgModule } from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HomeComponent} from "./home.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {HomeRoutingModule} from "./home.routing.module";
import {CommonModule} from "@angular/common";



@NgModule({
    declarations: [HomeComponent, DashboardComponent],
    imports: [HomeRoutingModule, FormsModule, CommonModule],

})
export class HomeModule {

}
