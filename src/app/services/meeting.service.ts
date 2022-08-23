import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import ApiEndpoint from "./ApiEndpoint";

@Injectable({
    providedIn: 'root'
})
export class MeetingService {
    private ENDPOINT = ApiEndpoint.MEETING_ENDPOINT;

    constructor(private httpClient: HttpClient) { }

    createMeeting(formData:FormData) {
        return this.httpClient.post(`${this.ENDPOINT}/create`, formData, {responseType:"text"})
    }
    joinMeeting(formData:FormData) {
        return this.httpClient.post(`${this.ENDPOINT}/join`, formData)
    }

    leaveMeeting(peerId: string) {
        let formData = new FormData();
        formData.append('peerId',peerId)
        return this.httpClient.post(`${this.ENDPOINT}/leave`, formData)

    }
}
