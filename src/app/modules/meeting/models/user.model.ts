import {Subject} from "rxjs";

export interface ConnectedUser {
    notify: Subject<boolean>;
    id?:number;
    name?: string;
    peerId?:string;
    isFocused?:boolean;
    stream?:MediaStream;
}
