import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RequireNoAuthenticationGuardService implements CanActivate {

    constructor(
        private router: Router
    ) { }

    canActivate(): boolean {
            
        if(sessionStorage.getItem("member_token") == null){
            return true;
        }else{
            this.router.navigate([ '/member', 'dashboard']);
            return true;
        }
    }
}
