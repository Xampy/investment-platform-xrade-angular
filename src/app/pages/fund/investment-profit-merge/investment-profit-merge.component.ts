import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountDataManagerService } from 'src/app/services/account/account-data-manager.service';
import { InvestmentProfitApiService } from 'src/app/services/api/xrade/fund/interest-profit/investment-profit-api.service';
import { AppToastService } from 'src/app/services/component/app-toast.service';
import { MemberLoginApiRequestOutputData } from 'src/app/share/types/api/member-api/member-login-api.type';

@Component({
  selector: 'app-investment-profit-merge',
  templateUrl: './investment-profit-merge.component.html',
  styleUrls: ['./investment-profit-merge.component.css']
})
export class InvestmentProfitMergeComponent implements OnInit {

    member: MemberLoginApiRequestOutputData;

    metadata: string = "";
    amount: number = 0.00;
    canMerge = false;
    isRequesting: boolean = false;
    
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

                if(this.member.interest_account.amount >= 25){
                    this.canMerge = true;
                }
            }
        )
    }

   

    requestMerge(){

        this.isRequesting = true;
        this.investmentProfitApiService.mergeAccount({amount: this.amount})
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
