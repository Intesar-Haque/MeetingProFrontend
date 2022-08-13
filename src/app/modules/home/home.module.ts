import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import {FormsModule} from "@angular/forms";

const homeRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    }
]

@NgModule({
    declarations: [HomeComponent],
    imports: [RouterModule.forChild(homeRoutes), FormsModule],
    exports: [RouterModule]
})
export class HomeModule {

}