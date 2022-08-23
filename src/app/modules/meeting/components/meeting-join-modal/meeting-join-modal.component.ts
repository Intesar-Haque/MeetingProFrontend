import { Component, OnInit } from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Utils from "../../../../utils/utils";
import {Subject} from "rxjs";
import {ActivatedRouteSnapshot, Router} from "@angular/router";

@Component({
  selector: 'app-meeting-join-modal',
  templateUrl: './meeting-join-modal.component.html',
  styleUrls: ['./meeting-join-modal.component.scss']
})
export class MeetingJoinModalComponent implements OnInit {

  constructor(public modalRef: BsModalRef, private formBuilder: FormBuilder, private route: Router) {
  }
  public form: FormGroup;
  public nameUpdateEvent: Subject<string> = new Subject<string>()

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name:['',[Validators.required]],
    });
  }

  join() {
    console.log(this.form.value.name)
    this.nameUpdateEvent.next(this.form.value.name)
    this.modalRef.hide()
  }
  login() {
    this.route.navigate(['/login']);
    this.modalRef.hide()
  }
}
