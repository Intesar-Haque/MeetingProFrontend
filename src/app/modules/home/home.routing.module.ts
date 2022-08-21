import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {HomeComponent} from "./home.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AppAuthService} from "../../app-auth.service";
import {GroupHomeComponent} from "./components/group-home/group-home.component";
import {CalenderHomeComponent} from "./components/calender-home/calender-home.component";
import {CallHomeComponent} from "./components/call-home/call-home.component";
import {ChatHomeComponent} from "./components/chat-home/chat-home.component";

const routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AppAuthService],
        children: [
            { path: 'home', component: DashboardComponent},
            { path: 'group', component: GroupHomeComponent},
            { path: 'calender', component: CalenderHomeComponent},
            { path: 'call', component: CallHomeComponent},
            { path: 'chat', component: ChatHomeComponent},
        ],

    },
    { path: 'room/:roomId', loadChildren: () => import('../../modules/call/call.module').then(c => c.CallModule)},
    {
      path: '**',
      canActivate: [AppAuthService],
      loadChildren: () => import('../../modules/not-found/page-not-found.module').then(n => n.PageNotFoundModule)
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {
}
