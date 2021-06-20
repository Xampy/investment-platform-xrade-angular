import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountDataManagerService } from 'src/app/services/account/account-data-manager.service';
import { SponsorshipProfitService } from 'src/app/services/api/xrade/fund/sponsorship-profit/sponsorship-profit.service';
import { AppToastService } from 'src/app/services/component/app-toast.service';
import { MemberLoginApiRequestOutputData } from 'src/app/share/types/api/member-api/member-login-api.type';

@Component({
  selector: 'app-sponsorship-profit-withdrawal',
  templateUrl: './sponsorship-profit-withdrawal.component.html',
  styleUrls: ['./sponsorship-profit-withdrawal.component.css']
})
export class SponsorshipProfitWithdrawalComponent implements OnInit {

    member: MemberLoginApiRequestOutputData;

    metadata: string = " ";
    payment: string = "";
    amount: number = 1.00;
    canWithdrawal = false;
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

                if(data != null && this.member.interest_account.amount >= 1){
                    this.canWithdrawal = true;
                }
            }
        )
    }

    ngOnInit(): void {
    }

    requestWithdrawal(){

        this.isRequesting = true;
        this.sponsorshipProfitApiService.createWithdrawalRequest({amount: this.amount, payment: this.payment, metadata: this.metadata})
        .subscribe(
            (data) => {
                console.log(data);
                this.isRequesting = false;
                this.toastsService.show(
                    "Success", 
                    "Your request has been placed. it can took up to 24H...Please be patient", 
                    { classname: 'bg-success text-white' });
            },
            (error: HttpErrorResponse) => {
                this.isRequesting = false;
                this.toastsService.show("Error", error.error.message, { classname: 'bg-danger text-white' });     
            }
        )
    }

}
