import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AccountDataManagerService } from 'src/app/services/account/account-data-manager.service';
import { InvestmentProfitApiService } from 'src/app/services/api/xrade/fund/interest-profit/investment-profit-api.service';
import { SponsorshipProfitService } from 'src/app/services/api/xrade/fund/sponsorship-profit/sponsorship-profit.service';
import { MemberWithdrawApiService } from 'src/app/services/api/xrade/fund/withdraw/member-withdraw-api.service';
import { AppToastService } from 'src/app/services/component/app-toast.service';
import { MemberLoginApiRequestOutputData } from 'src/app/share/types/api/member-api/member-login-api.type';

@Component({
  selector: 'app-withdrawal-widget-form',
  templateUrl: './withdrawal-widget-form.component.html',
  styleUrls: ['./withdrawal-widget-form.component.css']
})
export class WithdrawalWidgetFormComponent implements OnInit {


    @Input()
    title: string = "";

    @Input()
    cardTitle: string = "";

    @Input()
    accountType: "invest" | "profit" | "sponsor" = null;


    member: MemberLoginApiRequestOutputData;

    accountAmount: number = 0;
    metadata: string = "";
    amount: number = 0.00;
    canWithdrawal = false;
    isRequesting: boolean = false;
    paymentMethod: string = "";
    today: Date = new Date();




    
    constructor(
        public memberDataManager: AccountDataManagerService,
        private withdrawApiService: MemberWithdrawApiService,
        private investmentProfitApiService: InvestmentProfitApiService,
        private sponsorshipProfitApiService: SponsorshipProfitService,
        private toastsService: AppToastService,
    ) { 
       
    }

    ngOnInit(): void {
         //Get the member subject in order to subscribe to it
         this.memberDataManager.getMemberSubject()
         .subscribe(
             (data) => {
                 this.member = data;
                 console.log(this.member);
 
                 if(data != null){

                    if(this.accountType == "invest"){
                        this.accountAmount = this.member.account.amount;
                        if(this.member.account.amount >= 25){
                            this.canWithdrawal = true;
                        }
                    }else if(this.accountType == "profit"){
                        this.accountAmount = this.member.interest_account.amount;
                        if(this.member.interest_account.amount >= 1){
                            this.canWithdrawal = true;
                        }

                    }else if(this.accountType == "sponsor"){
                        this.accountAmount = this.member.sponsorship_account.amount;
                        if(this.member.sponsorship_account.amount >= 10){
                            this.canWithdrawal = true;
                        }
                    }
                     
                 }
             }
         )
    }


    requestWithdrawal(){


        //Construct the metadata by the type
        //[START] construct the meta data
        switch(this.paymentMethod){
            case "credit-card":
                const cardNumber: string = (document.getElementById("card-number") as any).value;
                const exp: string = (document.getElementById("exp") as any).value;
                const cvc: string = (document.getElementById("cvc") as any).value;

                if(cardNumber.length >0 && exp.length >0 && cvc.length > 0){
                    this.metadata = JSON.stringify({number: cardNumber, exp: exp, cvc: cvc});
                }else{
                    this.toastsService.show(
                        "Error", 
                        "Card informations are invalid", 
                        { classname: 'bg-danger text-white' });
                    return;
                }

                break;
            case "btc":
                const btcAddress:string = (document.getElementById("btc-address") as any).value;

                if(btcAddress.length > 0){
                    this.metadata = JSON.stringify({address: btcAddress});
                }else{
                    this.toastsService.show(
                        "Error", 
                        "Bitcoin address is invalid", 
                        { classname: 'bg-danger text-white' });
                    return;
                }
                break;
            case "perfect-money":
                const perfectMoneyAddress:string = (document.getElementById("perfect-money-address") as any).value;

                if(perfectMoneyAddress.length > 0){
                    this.metadata = JSON.stringify({address: perfectMoneyAddress});
                }else{
                    this.toastsService.show(
                        "Error", 
                        "Perfect Money address is invalid", 
                        { classname: 'bg-danger text-white' });
                    return;
                }
                break
        }
        //[END] construct the meta data

        this.isRequesting = true;


        //[START] call api to save withdrawal request
        if(this.accountType == "invest"){
            this.withdrawApiService.createWithdrawRequest({amount: this.amount, payment: this.paymentMethod, metadata: this.metadata})
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

        }else if(this.accountType == "profit"){
            this.investmentProfitApiService.createWithdrawalRequest({amount: this.amount, payment: this.paymentMethod, metadata: this.metadata})
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

        }else if(this.accountType == "sponsor"){
            this.sponsorshipProfitApiService.createWithdrawalRequest({amount: this.amount, payment: this.paymentMethod, metadata: this.metadata})
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
        //[END] call api to save withdrawal request
        
    }

}
