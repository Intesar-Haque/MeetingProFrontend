import {Subject} from "rxjs";

export interface ConnectedUser {
    notify: Subject<boolean>;
    id?:number;
    name?: string;
    peerId?:string;
    stream?:MediaStream;
}
