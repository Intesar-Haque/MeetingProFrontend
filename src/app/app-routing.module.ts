import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppAuthService} from "./services/app-auth.service";
import {ContainerComponent} from "./common-components/container/container.component";

const routes: Routes = [
  //Paths with top-bar and sidebar
  {
    path: '',
    canActivate: [AppAuthService],
    component:ContainerComponent,
    children:[
      { path: '', loadChildren: () => import('./modules/dashboard/dashboard.module').then(h => h.DashboardModule)},
      { path: 'group', loadChildren: () => import('./modules/group/group.module').then(h => h.GroupModule)},
      { path: 'calender', loadChildren: () => import('./modules/calender/calender.module').then(h => h.CalenderModule)},
      { path: 'call', loadChildren: () => import('./modules/call/call.module').then(h => h.CallModule)},
      { path: 'message', loadChildren: () => import('./modules/message/message.module').then(h => h.MessageModule)},
    ]
  },
  //Paths without top-bar and sidebar
  {
    path: 'login',
    loadChildren: () => import('./modules/auth/auth.module').then(h => h.AuthModule)
  },
  {
    path: 'room/:roomId',
    loadChildren: () => import('./modules/meeting/meeting.module').then(c => c.MeetingModule)
  },
  {
    path: '**',
    canActivate: [AppAuthService],
    loadChildren: () => import('./modules/not-found/page-not-found.module').then(n => n.PageNotFoundModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
