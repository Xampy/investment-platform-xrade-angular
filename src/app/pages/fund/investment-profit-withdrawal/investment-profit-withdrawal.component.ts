import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountDataManagerService } from 'src/app/services/account/account-data-manager.service';
import { InvestmentProfitApiService } from 'src/app/services/api/xrade/fund/interest-profit/investment-profit-api.service';
import { AppToastService } from 'src/app/services/component/app-toast.service';
import { MemberLoginApiRequestOutputData } from 'src/app/share/types/api/member-api/member-login-api.type';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-investment-profit-withdrawal',
  templateUrl: './investment-profit-withdrawal.component.html',
  styleUrls: ['./investment-profit-withdrawal.component.css']
})
export class InvestmentProfitWithdrawalComponent implements OnInit {
    member: MemberLoginApiRequestOutputData;

    metadata: string = "";
    amount: number = 0.00;
    canWithdrawal = false;
    isRequesting: boolean = false;
    paymentMethod: string = "";
    
    constructor(
        public memberDataManager: AccountDataManagerService,
        private investmentProfitApiService: InvestmentProfitApiService,
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
        this.investmentProfitApiService.createWithdrawalRequest({amount: this.amount, payment: this.paymentMethod, metadata: "test"})
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
