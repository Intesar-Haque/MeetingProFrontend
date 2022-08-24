import { NgModule } from '@angular/core';
import {LoginComponent} from "./components/login/login.component";
import {RouterModule, Routes} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {LottieModule} from "ngx-lottie";

const authRoutes: Routes = [
    {
        path: '',
        component: LoginComponent
    }
]

@NgModule({
    declarations: [LoginComponent],
    imports: [
        RouterModule.forChild(authRoutes),
        ReactiveFormsModule,
        CommonModule,
        LottieModule,
    ],
    exports: [RouterModule]
})
export class AuthModule { }
