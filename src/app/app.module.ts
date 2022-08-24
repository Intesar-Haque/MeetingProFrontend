import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HeaderComponent} from "./common-components/header/header.component";
import { ContainerComponent } from './common-components/container/container.component';
import {ModalModule} from "ngx-bootstrap/modal";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AngularMultiSelectModule} from "angular2-multiselect-dropdown";
import {HttpClientModule} from "@angular/common/http";
import {BsDatepickerModule, BsLocaleService, DatepickerModule} from "ngx-bootstrap/datepicker";
import {NgxSpinnerModule} from "ngx-spinner";
import {LottieModule} from "ngx-lottie";
import {SharedModule} from "./common-modules/shared.module";
import player from 'lottie-web';
export function playerFactory() {
  return player;
}
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    LottieModule.forRoot({ player: playerFactory }),
    ModalModule.forRoot(),
    DatepickerModule.forRoot(), BsDatepickerModule.forRoot(),
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    AngularMultiSelectModule, NgxSpinnerModule, SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
