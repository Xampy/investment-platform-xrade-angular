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

    constructor(
        private router: Router, 
        private appService: AppService, 
        private layoutService: LayoutService,
        
        private store: Store<AppState>,
        private observersDeviseService: DefaultDeviseService,
        private orderAmountService: OrderAccountAmountObserverService,
        private accountAmontManagerService: AccountAmountManagerService,

        public memberDataManager: AccountDataManagerService,

        //Xrade API
        private marketAnalysisDataApiService: MarketAnalysisDataApiService,
        private interestPaymentApiService: MemberInterestPaymentApiService,
    ) {

        //Subscribe to the amount observer
        /*this.accountAmontManagerService.getLastStableAmountSubject()
        .subscribe(
            (value) => {
                this.realAmount = value;
            }
        )*/

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
                    this.totalProfit = 0 + this.member.interest_account.amount;
                    this.realAmount = this.member.account.amount;
                    this.totalAmount = this.member.account.amount + this.totalProfit;
                }
            }
        )

    }

    ngOnInit(): void {
        console.log("App set up");

        
        //[START] subscribing market data
        /*let analysisOberserver = this.marketAnalysisDataApiService
        .getNext({offset: 0, limit: 1});
        timer(10000, 60000)
        .pipe(
            switchMap(data => analysisOberserver)
        )

        analysisOberserver.subscribe(
            (data) => {
                console.log(data);
                for(let analysis of data){
                    //Dispatch action create analysis
                    this.store.dispatch(
                        new AddAnalysisDataItemAction(
                            {
                                id: "mk-" + analysis.id,
                                order: analysis.analysis.order_type == "BUY"?"buy":"sell",
                                position: analysis.analysis.position,
                                stopLoss: analysis.max_loss,
                                takeProfit: analysis.max_profit,
                                startTime: analysis.analysis.start_time,
                                endTime: analysis.analysis.end_time,
                                timeframe: analysis.analysis.timeframe,
                        
                                analysis: {
                                    market: { devise: "" },
                                    totalLot: analysis.total_lot,
                                    availableLot: analysis.available_lot,
                                    price: analysis.price,
                                    published: true
                                }
                            }
                        )
                    );

                    //After create observer on each to observe
                    //The change the total  lot
                    

                    let isIn_index = this.analysisUpdate.findIndex((item, index) => item.id == analysis.id);
                    if (isIn_index < 0){
                        let observer = this.marketAnalysisDataApiService.getSingle(analysis.id);
                        this.analysisUpdate.push(
                            {
                                id: analysis.id,
                                obs: timer(10000, 10000)
                                .pipe(
                                    switchMap(data => observer)
                                )
                            }
                        );
                        this.analysisUpdate.find((item)=>item.id == analysis.id).obs.subscribe(
                            (data) => {
                                //Update the analysis
                                console.log("Updating analysis...");
                                this.store.dispatch(
                                    new UpdateAnalysisDataItemAction(
                                        {
                                            id: "mk-" + data.id,
                                            order: data.analysis.order_type == "BUY"?"buy":"sell",
                                            position: data.analysis.position,
                                            stopLoss: data.max_loss,
                                            takeProfit: data.max_profit,
                                            startTime: data.analysis.start_time,
                                            endTime: data.analysis.end_time,
                                            timeframe: data.analysis.timeframe,
                                    
                                            analysis: {
                                                market: { devise: "" },
                                                totalLot: data.total_lot,
                                                availableLot: data.available_lot,
                                                price: data.price,
                                                published: true
                                            }
                                        }
                                    )
                                );
                            }
                        );
                    }
                }

            }
        )*/
        //[END] subscribing market data
    

        //Handle service interaction

        
        //[START] handle order benefits update to update the amount
        /*this.orderAmountService.getOrderAmountOberserver()
        .subscribe(
            (benefitsData) => {
                console.log("Amoutn update got the benefits data form order change");
                console.log("Amount update with order",  benefitsData);

                let initialAmount = this.accountAmontManagerService.getLastStableAmount();
                
                let toAdd = 0;
                if ( benefitsData.length > 0){
                    for (let i = 0; i < benefitsData.length; i++) {
                        const bd = benefitsData[i];

                        if ( bd.benefit > 0 ){
                        toAdd = toAdd + (bd.benefit + bd.amount);
                        }else {
                        toAdd += bd.benefit;
                        }
                        
                    }

                    console.log( "Our benefit : ", toAdd);
                    console.log("Amount updated to ", initialAmount + toAdd);

                    //UPdate the current amount
                    this.accountAmontManagerService.updateAmount(
                        toAdd,
                        false //We areupdating with order benefits
                    )
                }

            }
        )*/
        //[END]
        
    }

}
