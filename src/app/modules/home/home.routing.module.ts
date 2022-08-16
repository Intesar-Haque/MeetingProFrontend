import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {HomeComponent} from "./home.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AppAuthService} from "../../app-auth.service";

const routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AppAuthService],
        children: [
            {path: '', component: DashboardComponent},
        ],
    },
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {
}
