import {Component, OnInit, ViewChild} from '@angular/core';
import {Element} from "@angular/compiler";
import LocalStorageUtil from "../../utils/local-storage";
import {Router} from "@angular/router";
import Utils from "../../utils/utils";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  showSidebar:boolean = false;
  menu = [{
    name:'Dashboard',
    icon:'fa fa-home',
    route:''
  },{
    name:'Profile',
    icon:'fa fa-user',
    route:''
  },{
    name:'About',
    icon:'fa fa-question',
    route:''
  }];
  user: {
    name?:string;
    designation?:string;
    img?:string;
  } = {};
  noImage: string;
  constructor(private route: Router) { }

  ngOnInit(): void {
    this.user.name = LocalStorageUtil.getString('username')
    this.user.designation = LocalStorageUtil.getString('designation')
    this.user.img = LocalStorageUtil.getString('user-image')
    this.noImage = Utils.noImage
  }

  logout() {
    LocalStorageUtil.clear()
    this.route.navigate(['/login']);

  }
}
