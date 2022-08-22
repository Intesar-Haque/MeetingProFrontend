import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import LocalStorageUtil from "../../../../utils/local-storage";
import Utils from "../../../../utils/utils";
import {AppAuthService} from "../../../../common-services/app-auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  visibility: boolean = false;
  loginForm: FormGroup;

  constructor(
      private router: Router,
      private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
      grant_type: ["password", Validators.required]
    });
  }

  onSubmit() {
    if(this.loginForm.valid){
      LocalStorageUtil.setInfo('token', Utils.genRoomId()); // TODO: Call api and set token
      LocalStorageUtil.setInfo('username', this.loginForm.value.username); // TODO: Call api and set token
      this.router.navigate(['/'])
    }
  }
}
