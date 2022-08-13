import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppAuthService} from "./app-auth.service";

const routes: Routes = [
  {
    path: '',
    canActivate: [AppAuthService],
    loadChildren: () => import('./modules/home/home.module').then(h => h.HomeModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/auth/auth.module').then(h => h.AuthModule)
  },
  {
    path: 'call/:roomId',
    loadChildren: () => import('./modules/call/call.module').then(c => c.CallModule)
  },
  {
    path: '**',
    loadChildren: () => import('./modules/not-found/page-not-found.module').then(n => n.PageNotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
