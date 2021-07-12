import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AppService } from 'src/app/app.service';
import { LayoutService } from 'src/app/layout/layout.service';
import { AccountAmountManagerService } from 'src/app/services/account/account-amount-manager.service';
import { AccountDataManagerService } from 'src/app/services/account/account-data-manager.service';
import { MemberInterestPaymentApiService } from 'src/app/services/api/xrade/fund/interest-payment/member-interest-payment-api.service';
import { MarketAnalysisDataApiService } from 'src/app/services/api/xrade/market-analysis-data/market-analysis-data-api.service';
import { DefaultDeviseService } from 'src/app/services/observers/devise/default-devise.service';
import { OrderAccountAmountObserverService } from 'src/app/services/observers/order/order-account-amount-observer.service';
import { AnalysisApiRequestOutput } from 'src/app/share/types/api/analysis-api/analysis-api.types';
import { MemberInterestPaymentApiRequestOutput } from 'src/app/share/types/api/interest-payment-api/interest-payment-api.types';
import { MemberLoginApiRequestOutputData } from 'src/app/share/types/api/member-api/member-login-api.type';
import { AddAnalysisDataItemAction, UpdateAnalysisDataItemAction } from 'src/app/store/analysis/actions/analysis-data.action';
import { AppState } from 'src/app/store/models/app-state.model';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: [
        './dashboard.component.css', 
        '../../../vendor/libs/ngx-perfect-scrollbar/ngx-perfect-scrollbar.scss'
    ]
})
export class DashboardComponent implements OnInit {

    /**
     * Analysis container
     * 
     * Contains availble analysis that when choosed one
     * we can suscribe to this one only
     */
    analysisUpdate: Array<{id: number, obs: Observable<AnalysisApiRequestOutput>}> = [];
    
    
    
    
    /**
     * Member account property
     * contains the current stable amount of the
     * member account
     */
    realAmount: number = 0.00;

    /**
     * Contains the recents rate payment made by the plateform
     * from the manager
     */
    interestPayments: MemberInterestPaymentApiRequestOutput[] = [];

    
    member: MemberLoginApiRequestOutputData;

    /**
     * Total profit made by the member
     * it's the sum of the sponsordhip and the interest
     */
    totalProfit: number = 0.00;
    totalAmount: number = 0.00;
    dailyInterest: number = 0.00;
    investmentProfit: number = 0.00;
    sponsorshipProfit: number = 0.00;

    date: Date = null;

    constructor(
        private router: Router,
        public memberDataManager: AccountDataManagerService,

        //Xrade API
        private interestPaymentApiService: MemberInterestPaymentApiService,
    ) {

        this.date = new Date();
        this.memberDataManager.init();

        //Subscribe to the amount observer
        /*this.accountAmontManagerService.getLastStableAmountSubject()
        .subscribe(
            (value) => {
                this.realAmount = value;
            }
        )*/

        

    }

    investmentWithdrawal(){
        this.router.navigate(['/member/fund/withdrawal']);
    }

    profitWithdrawal(){
        this.router.navigate(['/member/fund/investment-profit/withdrawal']);
    }

    profitMerge(){
        this.router.navigate(['/member/fund/investment-profit/merge']);
    }

    sponsorshipWithdrawal(){
        this.router.navigate(['/member/fund/sponsorship-profit/withdrawal']);
    }

    sponsorshipMerge(){
        this.router.navigate(['/member/fund/sponsorship-profit/merge']);
    }

    ngOnInit(): void {
        console.log("App set up");

        this.interestPaymentApiService.getLastest()
        .subscribe(
            (data) => {
                console.log(data);
                this.interestPayments = data;
            }
        )

        //Get the member subject in order to subscribe to it
        this.memberDataManager.getMemberSubject()
        .subscribe(
            (data) => {
                this.member = data;
                console.log(this.member);

                if(this.member != null){
                    this.totalProfit = this.member.sponsorship_account.amount + this.member.interest_account.amount;
                    this.investmentProfit = this.member.interest_account.amount;
                    this.sponsorshipProfit = this.member.sponsorship_account.amount;
                    this.realAmount = this.member.account.amount;
                    this.totalAmount = this.member.account.amount + this.totalProfit;

                    this.dailyInterest =  0.00;//Math.round( (0.95 * this.realAmount)/100  );
                }
            }
        );
    }

}
