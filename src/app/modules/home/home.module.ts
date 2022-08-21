import { NgModule } from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HomeComponent} from "./home.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {HomeRoutingModule} from "./home.routing.module";
import {CommonModule} from "@angular/common";
import { ChatHomeComponent } from './components/chat-home/chat-home.component';
import { CallHomeComponent } from './components/call-home/call-home.component';
import { GroupHomeComponent } from './components/group-home/group-home.component';
import { CalenderHomeComponent } from './components/calender-home/calender-home.component';
import { TitleComponent } from './components/title/title.component';



@NgModule({
    declarations: [HomeComponent, DashboardComponent, ChatHomeComponent, CallHomeComponent, GroupHomeComponent, CalenderHomeComponent, TitleComponent],
    imports: [HomeRoutingModule, FormsModule, CommonModule],

})
export class HomeModule {

}
