import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import Utils from "../../../../utils/utils";
import {MeetingService} from "../../../../services/meeting.service";
import {AlertService} from "../../../../services/alert.service";
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import {MeetingJoinModalComponent} from "../../../meeting/components/meeting-join-modal/meeting-join-modal.component";
import LocalStorageUtil from "../../../../utils/local-storage";
import {
    MeetingCreateModalComponent
} from "../meeting-create-modal/meeting-create-modal.component";

@Component({
    selector: 'app-meeting-home',
    templateUrl: './call-home.component.html',
    styleUrls: ['./call-home.component.scss']
})
export class CallHomeComponent {
    constructor(private router: Router, private meetingService:MeetingService, private modalService:BsModalService, private alertService:AlertService) {
    }
    public modalRef:BsModalRef;
    roomId: string;
    public createMeeting(){
        this.roomId = Utils.genRoomId();
        const initialState: ModalOptions = {
            initialState: {
                roomId:this.roomId
            } as Partial<Object> ,
            class: 'modal-l',
            ignoreBackdropClick:true
        };
        this.modalRef = this.modalService.show(MeetingCreateModalComponent, initialState);
        this.modalRef.content.nameUpdateEvent.subscribe(()=>this.createRoom())
    }
    public createRoom(): void {
        let formData = new FormData();
        formData.append('meetingCode', this.roomId)
        this.alertService.loading()
        this.meetingService.createMeeting(formData).subscribe({
            next:()=> {
                this.alertService.closeAlert()
                this.router.navigateByUrl(`/room/${this.roomId}`)
            },
            error:(err)=> this.alertService.showError()
        })
    }

    joinRoom() {
        this.router.navigateByUrl(`/room/${this.roomId}`)
    }

}
