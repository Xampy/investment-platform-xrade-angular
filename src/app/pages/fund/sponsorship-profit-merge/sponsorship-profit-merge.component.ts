import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountDataManagerService } from 'src/app/services/account/account-data-manager.service';
import { SponsorshipProfitService } from 'src/app/services/api/xrade/fund/sponsorship-profit/sponsorship-profit.service';
import { AppToastService } from 'src/app/services/component/app-toast.service';
import { MemberLoginApiRequestOutputData } from 'src/app/share/types/api/member-api/member-login-api.type';

@Component({
  selector: 'app-sponsorship-profit-merge',
  templateUrl: './sponsorship-profit-merge.component.html',
  styleUrls: ['./sponsorship-profit-merge.component.css']
})
export class SponsorshipProfitMergeComponent implements OnInit {

    member: MemberLoginApiRequestOutputData;

    metadata: string = "";
    amount: number = 20.00;
    canMerge = false;
    isRequesting: boolean = false;
    
    constructor(
        public memberDataManager: AccountDataManagerService,
        private sponsorshipProfitApiService: SponsorshipProfitService,
        private toastsService: AppToastService,
    ) { 
        //Get the member subject in order to subscribe to it
        this.memberDataManager.getMemberSubject()
        .subscribe(
            (data) => {
                this.member = data;
                console.log(this.member);

                if(data != null && this.member.interest_account.amount >= 5){
                    this.canMerge = true;
                }
            }
        )
    }

   

    requestMerge(){

        this.isRequesting = true;
        this.sponsorshipProfitApiService.mergeAccount({amount: this.amount})
        .subscribe(
            (data) => {
                console.log(data);
                this.isRequesting = false;

                this.memberDataManager.updateMember(data);
                this.toastsService.show(
                    "Success", 
                    "Your merge request has been processed sucessfully", 
                    { classname: 'bg-success text-white' });
            },
            (error: HttpErrorResponse) => {
                this.isRequesting = false;
                this.toastsService.show("Error", error.error.message, { classname: 'bg-danger text-white' });     
            }
        )
    }

    ngOnInit(): void {
    }

}
