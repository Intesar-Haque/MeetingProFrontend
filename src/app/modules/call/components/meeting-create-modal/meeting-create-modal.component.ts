import { Component, OnInit } from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {Clipboard} from '@angular/cdk/clipboard';
import ApiEndpoint from "../../../../services/ApiEndpoint";


@Component({
  selector: 'app-meeting-create-modal',
  templateUrl: './meeting-create-modal.component.html',
  styleUrls: ['./meeting-create-modal.component.scss']
})
export class MeetingCreateModalComponent implements OnInit {


  constructor(public modalRef: BsModalRef, private formBuilder: FormBuilder, private route: Router,private clipboard: Clipboard) {
  }
  public form: FormGroup;
  public nameUpdateEvent: Subject<string> = new Subject<string>()
  roomId: any;
  emails: string[]=[];

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email:['',[Validators.email]],
    });
  }
  copyLink(){
    this.clipboard.copy(`${ApiEndpoint.MY_ADDRESS}/room/${this.roomId}`)
  }

  join() {
    this.nameUpdateEvent.next(this.form.value.name)
    this.modalRef.hide()
  }
  login() {
    this.route.navigate(['/login']);
    this.modalRef.hide()
  }

  removeEmail(idx) {
    this.emails.splice(idx,1)
  }
  addEmail() {
    if(this.form.value.email != ''){
      this.emails.push(this.form.value.email)
      this.form.reset()
    }
  }
}
