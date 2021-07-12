import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { MemberLoginApiRequestOutputData } from 'src/app/share/types/api/member-api/member-login-api.type';
import { SecurityApiService } from '../api/xrade/security/security-api.service';

@Injectable({
  providedIn: 'root'
})
export class AccountDataManagerService {

    member: MemberLoginApiRequestOutputData = null;
    memberSubject$: BehaviorSubject<MemberLoginApiRequestOutputData> = new BehaviorSubject(this.member);
    constructor(
        private securityService: SecurityApiService
    ) { 
        this.securityService.getMemberData()
        .subscribe(
            (data) => {
                console.log(data);
                this.member = data.data;
                this.memberSubject$.next(this.member);
            }
        )
    }
    
    init(){
        this.member = JSON.parse(sessionStorage.getItem("member"));
        console.log("Loading user data");
        
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
