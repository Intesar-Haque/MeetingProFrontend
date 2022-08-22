import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import LocalStorageUtil from "../../utils/local-storage";
import Utils from "../../utils/utils";

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

  current = 'Groups';
  menu = [{
    name:'Home',
    icon:'fa fa-home',
    route:'/',
    selected:true,
  },{
    name:'Group',
    icon:'fa fa-users',
    route:'/group',
    selected:false,
  },{
    name:'Calender',
    icon:'fa fa-calendar-alt',
    route:'/calender',
    selected:false,
  },{
    name:'Call',
    icon:'fa fa-phone',
    route:'/call',
    selected:false,
  },{
    name:'Messages',
    icon:'fa fa-comments',
    route:'/message',
    selected:false,
  }];
  user: {
    name?:string;
    designation?:string;
    img?:string;
  } = {};
  noImage: string;
  public showMenuAndToolbar = true;
  constructor(private route: Router) { }

  ngOnInit(): void {
    this.user.name = LocalStorageUtil.getString('username')
    this.user.designation = LocalStorageUtil.getString('designation')
    this.user.img = LocalStorageUtil.getString('user-image')
    this.noImage = Utils.noImage
    // this.route.navigate(['/']);
    // this.current = 'Dashboard';
  }

  logout() {
    LocalStorageUtil.clear()
    this.route.navigate(['/login']);

  }

  navigate(item) {
    this.menu.forEach(i=>{i.selected=false})
    item.selected=true
    this.route.navigate([item.route]);
    this.current = item.name
  }
}
