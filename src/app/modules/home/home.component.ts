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
    route:'/chat',
    selected:false,
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

  navigate(item) {
    this.menu.forEach(i=>{i.selected=false})
    item.selected=true
    this.route.navigate([item.route]);
    console.log(this.menu)

  }
}
