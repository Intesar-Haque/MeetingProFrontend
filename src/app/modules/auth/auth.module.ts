import { NgModule } from '@angular/core';
import {LoginComponent} from "./components/login/login.component";
import {RouterModule, Routes} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

const authRoutes: Routes = [
    {
        path: '',
        component: LoginComponent
    }
]

@NgModule({
    declarations: [LoginComponent],
    imports: [RouterModule.forChild(authRoutes), ReactiveFormsModule, CommonModule],
    exports: [RouterModule]
})
export class AuthModule { }
