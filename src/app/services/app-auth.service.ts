import {Injectable} from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree
} from '@angular/router';
import {Observable} from "rxjs";
import LocalStorageUtil from "../utils/local-storage";
import {HttpClient} from "@angular/common/http";
import ApiEndpoint from "./ApiEndpoint";

@Injectable({
    providedIn: 'root'
})
export class AppAuthService implements CanActivate {
    constructor(private route: Router, private httpClient: HttpClient) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.verifyToken()) {
            this.route.navigate(['/login']);
            return false
        } else {
            return true
        }
    }

    verifyToken(){
        let token = LocalStorageUtil.getString('token')
        if(token){
            // TODO: CALL API TO CHECK TOKEN
            return false;
        } else {
            return true;
        }
    }

    register(payload) {
        return this.httpClient.post(`${ApiEndpoint.SERVICE_ENDPOINT}/register`, payload, {responseType:'text'})

    }

    login(username, password) {
        let formData =  new FormData();
        formData.set('username', username);
        formData.set('password', password);
        // return this.httpClient.post(`${ApiEndpoint.SERVICE_ENDPOINT}/authenticate`, `username=${username}&password=${password}`, {
        //     headers:{'Content-Type':'application/x-www-form-urlencoded'}})
        return this.httpClient.post(`${ApiEndpoint.SERVICE_ENDPOINT}/authenticate`, formData)

    }

    test() {
        const options = {withCredentials: true, 'access-control-allow-origin': "http://localhost:4200/", 'Content-Type': 'application/json'}

        return this.httpClient.get(`${ApiEndpoint.SERVICE_ENDPOINT}/test`,options).subscribe(next=>console.log(next))

    }
}
