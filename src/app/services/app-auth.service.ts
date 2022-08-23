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

@Injectable({
    providedIn: 'root'
})
export class AppAuthService implements CanActivate {
    constructor(private route: Router) {
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
}
