import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import LocalStorageUtil from "../../../../utils/local-storage";
import Utils from "../../../../utils/utils";
import {AppAuthService} from "../../../../services/app-auth.service";
import {AlertService} from "../../../../services/alert.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  visibility: boolean = false;
  loginForm: FormGroup;
  showLoginAnim: boolean = false;
  isLogin: boolean = true;
  registerForm: FormGroup;

  constructor(
      private router: Router,
      private formBuilder: FormBuilder,
      private alertService:AlertService,
      private authService:AppAuthService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
      grant_type: ["password", Validators.required]
    });
    this.registerForm = this.formBuilder.group({
      name: ["", Validators.required, Validators.maxLength(50)],
      email: ["", Validators.required, Validators.email],
      username: ["", Validators.required, Validators.maxLength(50)],
      password: ["", Validators.required, Validators.minLength(6), Validators.maxLength(20)],
      confirmPassword: [""],
      designation: [""],
    })
  }

  onSubmit() {
    this.login(this.loginForm.value.username, this.loginForm.value.password)
  }

  onRegister(){
    this.alertService.loading();
    this.authService.register(this.registerForm.value).subscribe(()=>{
      this.alertService.closeAlert()
      this.login(this.registerForm.value.username, this.registerForm.value.password)
    }, ()=>{alert('Server Unreachable')})
  }

  private login(username, password) {
    this.authService.login(username, password).subscribe((response:any)=> {
        LocalStorageUtil.setInfo('id', response['id']);
        LocalStorageUtil.setInfo('username', response['username']);
        LocalStorageUtil.setInfo('token', response['token']);
        LocalStorageUtil.setInfo('name', response['fullName']);
        LocalStorageUtil.setInfo('theme', response['colorProfile']);
        this.showLoginAnim= true;
        setTimeout(()=> {
          this.showLoginAnim = false
          this.router.navigate(['/'])
        }, 2000)
      },()=>{
        alert('Invalid Credentials')
    })
  }
}
