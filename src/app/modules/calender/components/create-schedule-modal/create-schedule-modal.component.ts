import { Component, OnInit } from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Utils from "../../../../utils/utils";

@Component({
  selector: 'app-create-schedule-modal',
  templateUrl: './create-schedule-modal.component.html',
  styleUrls: ['./create-schedule-modal.component.scss']
})
export class CreateScheduleModalComponent implements OnInit {


  constructor(public modalRef: BsModalRef, private formBuilder: FormBuilder) {
  }

  public form: FormGroup;
  public title: string = 'Create Schedule';

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [''],
      title: ['', [Validators.required]],
      description: [''],
      from:['',[Validators.required]],
      to: ['',[Validators.required]],
    });
  }

  save(submit = false) {
    console.log(this.form.value)
  }

  ddSetting(title='item', label = 'name', id = 'id', search = false) {
    return Utils.dropDownSettings(title, label, id, search)
  }

  join() {
    console.log(this.form.value)
  }
}
