import {Component, ElementRef, OnInit} from '@angular/core';
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
    name:'Groups',
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
  template: string =`<img src="../../../assets/gif/loading.gif"  alt="">`
  public showMenuAndToolbar = true;
  constructor(private route: Router,private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.user.name = LocalStorageUtil.getString('username')
    this.user.designation = LocalStorageUtil.getString('designation')
    this.user.img = LocalStorageUtil.getString('user-image')
    this.noImage = Utils.noImage
    this.route.navigate(['/']);
    this.current = 'Home';
    this.changeStyle(LocalStorageUtil.getString('theme'))
  }

  logout() {
    LocalStorageUtil.clear()
    this.changeStyle(null)
    this.route.navigate(['/login']);

  }

  navigate(item) {
    this.menu.forEach(i=>{i.selected=false})
    item.selected=true
    this.route.navigate([item.route]);
    this.current = item.name
  }

  changeStyle(style){
    LocalStorageUtil.setInfo('theme',style)
    let colorSecondary =''
    let colorSecondaryLight =''
    let colorSecondaryVeryLight =''
    let colorSecondaryDark =''
    switch (style){
      case 'blue':
        colorSecondary ='3b7dde'
        colorSecondaryLight ='3788ff'
        colorSecondaryVeryLight ='3b7dde'
        colorSecondaryDark ='0143a4'
        break;
      case 'green':
        colorSecondary ='138402'
        colorSecondaryLight ='39ac27'
        colorSecondaryVeryLight ='2ee912'
        colorSecondaryDark ='0b4d01'
        break;
      case 'bKash':
        colorSecondary ='E2136E'
        colorSecondaryLight ='e9206b'
        colorSecondaryVeryLight ='ff5ea5'
        colorSecondaryDark ='a8094f'
        break;
      case 'purple':
        colorSecondary ='610284'
        colorSecondaryLight ='b135de'
        colorSecondaryVeryLight ='9967ab'
        colorSecondaryDark ='2f0041'
        break;
      default:
        colorSecondary ='444791'
        colorSecondaryLight ='5B5FC7'
        colorSecondaryVeryLight ='bbd3ff'
        colorSecondaryDark ='323465'
        break;
    }
    document.documentElement.style.setProperty('--color-secondary', `#${colorSecondary}`)
    document.documentElement.style.setProperty('--text-secondary', `#${colorSecondary}`)
    document.documentElement.style.setProperty('--color-secondary-light', `#${colorSecondaryLight}`)
    document.documentElement.style.setProperty('--color-secondary-very-light', `#${colorSecondaryVeryLight}`)
    document.documentElement.style.setProperty('--color-secondary-dark', `#${colorSecondaryDark}`)

  }
}
