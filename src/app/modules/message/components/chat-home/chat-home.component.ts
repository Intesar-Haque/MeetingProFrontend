import {Component, OnInit} from '@angular/core';
import Utils from "../../../../utils/utils";

@Component({
    selector: 'app-chat-home',
    templateUrl: './chat-home.component.html',
    styleUrls: ['./chat-home.component.scss']
})
export class ChatHomeComponent implements OnInit {
    usersAndGroups: any[] = [];
    noImage: string | SVGImageElement;
    chats: any[]= [];

    constructor() {
    }

    ngOnInit(): void {
        this.usersAndGroups = [
            {
                image:'',
                name:'Friend One',
                message:'Example Message'
            },{
            image:'',
            name:'Friend Two',
            message:'Example Message'
        },{
            image:'data:image/png;base64,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',
            name:'Group One',
            message:'Example Message'
        }
        ]
        this.noImage = Utils.noImage
    }

    loadMessage(item: any) {
        this.chats = [
            {isMe:true, name:'', message:'Hi'},
            {isMe:true, name:'', message:'Hi'},
            {isMe:false, name:'', message:'Hi'}
        ]
    }
}
