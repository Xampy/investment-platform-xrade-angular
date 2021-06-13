import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { MemberLoginApiRequestOutputData } from 'src/app/share/types/api/member-api/member-login-api.type';

@Injectable({
  providedIn: 'root'
})
export class AccountDataManagerService {

    member: MemberLoginApiRequestOutputData = null;
    memberSubject$: BehaviorSubject<MemberLoginApiRequestOutputData> = new BehaviorSubject(this.member);
    constructor() { 
        //We load the session storage data about he current member
        //In case we dont have it it return null

        setTimeout(() => {
            this.member = JSON.parse(sessionStorage.getItem("member"));
            if(this.member == null){
                //Do something
                
            }else{
                this.memberSubject$.next(this.member);
            }
        }, 1000 * 5);
        
    }

    /**
     * Get the member informations
     * 
     * @returns {MemberLoginApiRequestOutputData | null} 
     */
    getData(){
        return this.member;
    }

    /**
     * Get the member suibject in order to subscribe to it
     * @returns 
     */
    getMemberSubject(){
        return this.memberSubject$;
    }

    /**
     * Update the member data
     * @param member Uthe new member information
     */
    updateMember(member: MemberLoginApiRequestOutputData){
        this.member = member;
        this.memberSubject$.next(this.member);
        sessionStorage.setItem("member", JSON.stringify(this.member));
    }
}
