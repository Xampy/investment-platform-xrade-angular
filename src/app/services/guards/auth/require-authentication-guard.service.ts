import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RequireAuthenticationGuardService implements CanActivate {

    constructor(
        private router: Router
    ) { }

    canActivate(): boolean {
             
        if(sessionStorage.getItem("member_token") == null){
            this.router.navigate(["/auth", "login"]);
            return false;
        }else{
            return true;
        }
    }
}
