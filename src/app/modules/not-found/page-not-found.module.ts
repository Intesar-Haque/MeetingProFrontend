import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageNotFoundComponent } from "./components/page-not-found.component";
import {LottieModule} from "ngx-lottie";

const router: Routes = [
    {
        path: '',
        component: PageNotFoundComponent
    }
]

@NgModule({
    declarations: [PageNotFoundComponent],
    imports: [RouterModule.forChild(router), LottieModule]
})
export class PageNotFoundModule {

}
