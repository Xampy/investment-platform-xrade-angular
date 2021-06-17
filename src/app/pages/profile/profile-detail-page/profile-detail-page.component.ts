import { Component, OnInit } from '@angular/core';
import { AccountDataManagerService } from 'src/app/services/account/account-data-manager.service';
import { MemberLoginApiRequestOutputData } from 'src/app/share/types/api/member-api/member-login-api.type';

@Component({
  selector: 'app-profile-detail-page',
  templateUrl: './profile-detail-page.component.html',
  styleUrls: ['./profile-detail-page.component.css']
})
export class ProfileDetailPageComponent implements OnInit {
    member: MemberLoginApiRequestOutputData;
    username: string = "";
    email: string = "";
    phone: string = "";

    constructor(
        public memberDataManager: AccountDataManagerService,
    ) {

    }

    ngOnInit(): void {
        //Get the member subject in order to subscribe to it
        this.memberDataManager.getMemberSubject()
        .subscribe(
            (data) => {
                this.member = data;
                console.log(this.member);

                if(this.member != null){
                    this.username = this.member.firstname;
                    this.email = this.member.email;
                    this.phone = this.member.phone;
                }
            }
        )
    }

}
