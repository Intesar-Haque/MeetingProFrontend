import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import ApiEndpoint from "../../../common-services/ApiEndpoint";
import {PageRequest} from "../../../common-models/PageRequest";

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private ENDPOINT = ApiEndpoint.GROUP_ENDPOINT;

  constructor(private httpClient: HttpClient) { }

  getLists(pageRequest:PageRequest) {
    return this.httpClient.post(`${this.ENDPOINT}/list`, pageRequest)
  }
}
