import { Component, OnInit } from '@angular/core';
import {formatDate} from '@angular/common';

declare var $: any;
declare var moment: any;
@Component({
  selector: 'app-calender-home',
  templateUrl: './calender-home.component.html',
  styleUrls: ['./calender-home.component.scss']
})
export class CalenderHomeComponent implements OnInit {
  weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  daysInMonth: number[]=[];
  today: number;

  constructor() {
  }

  ngOnInit() {
    let dt = new Date();
    let month = dt.getMonth();
    let year = dt.getFullYear();
    this.today = dt.getUTCDate()
    this.daysInMonth = Array.from(Array(new Date(year, month, 0).getDate()).keys());
  }


}
