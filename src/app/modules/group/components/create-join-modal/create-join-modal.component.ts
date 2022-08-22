import {Component, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Utils from "../../../../utils/utils";

@Component({
    selector: 'app-create-join-modal',
    templateUrl: './create-join-modal.component.html',
    styleUrls: ['./create-join-modal.component.scss']
})
export class CreateJoinModalComponent implements OnInit {

    constructor(public modalRef: BsModalRef, private formBuilder: FormBuilder) {
    }

    public form: FormGroup;
    public title: string = 'Group';
    public createGroup: boolean = false;
    public friendsList=[];

    ngOnInit(): void {
      if(this.createGroup){
          this.form = this.formBuilder.group({
              id: [''],
              name: ['', [Validators.required]],
              participants:['',[Validators.required]],
              purpose: [''],
          });
          this.title='Create Group'
      } else {
          this.form = this.formBuilder.group({
              inviteLink:['',[Validators.required]],
          });
          this.title='Join Group'
      }
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
