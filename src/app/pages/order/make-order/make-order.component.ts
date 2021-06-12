import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { id } from '@swimlane/ngx-datatable';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexYAxis,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { interval, Observable, timer } from 'rxjs';
import { filter, map, repeat, switchMap, tap } from 'rxjs/operators';
import { AccountAmountManagerService } from 'src/app/services/account/account-amount-manager.service';
import { CandleInterface, Mt5ApiService } from 'src/app/services/api/meta-trader/mt5-api.service';
import { MarketOrderApiService } from 'src/app/services/api/xrade/market-order/market-order-api.service';
import { AppToastService } from 'src/app/services/component/app-toast.service';
import { AnalysisDataItem } from 'src/app/store/analysis/models/analysis-data.model';
import { AppState } from 'src/app/store/models/app-state.model';
import { CloseMarketOrderAction, CreateMarketOrderItemAction, UpdateAllOrdersLastPositionAction, UpdateMarketOrderProcessItemAction } from 'src/app/store/order/actions/order.actions';
import { MarketOrderItem } from 'src/app/store/order/models/order.model';
import { UpdateSignalLastRowItemAction } from 'src/app/store/signal/actions/signal-last-row.actions';
import { UpdateSignalItemAction } from 'src/app/store/signal/actions/signal.actions';
import { CandleStick, SignalItem } from 'src/app/store/signal/models/signal.model';


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
};



@Component({
  selector: 'app-make-order',
  templateUrl: './make-order.component.html',
  styleUrls: ['./make-order.component.css']
})
export class MakeOrderComponent implements OnInit, AfterViewInit {

    @ViewChild("chart", {static: true}) 
    chart: ChartComponent;

    public chartOptions: Partial<ChartOptions>;

    @ViewChild("lotPrice") 
    private lotPrice: ElementRef;

    /**
     * CurrentMarket orders made the current
     * user
     */
    currentMarketOrders$: Observable<Array<MarketOrderItem>>;

    /**
     * Current market analysis
     */
    analysis: Observable<AnalysisDataItem>;
    /**
     * Chart serie array
     */
    chartSerieArray: Observable<SignalItem>;
    /**
     * It observe the meta trader api
     * and handle values returned
     */
    deviseApiObserver: Observable<Array<CandleInterface>>;

    @Input()
    /**
     * Lot took by the member
     */
    lot: number = 1;

    /**
     * The total amount costed for
     * making the order after choosing the
     * wanted lot
     */
    orderAmount: number = 0;
    chartSerie: CandleStick[];
    /**
     * The market id passed
     * as parameter to route
     */
    id: string;
    /**
     * Current postiion on the market
     */
    currentPosition: number = 10;
    takeProfit: number;
    stopLoss: number;

    providedTakeProfit: number;
    providedStopLoss: number;

    /**
     * When saving market hold it state
     */
    isSaving: boolean = false;
    

    constructor(
        private store: Store<AppState>,
        private route: ActivatedRoute,

        private accountAmontManagerService: AccountAmountManagerService,
        private toastsService: AppToastService,

        //Xrade PI
        private  marketOrderApiService:  MarketOrderApiService
    ) {
        
        //Nee to set it at -1
        this.currentPosition = 10; //To avoid missleading order
    }

    ngAfterViewInit(): void {
        //Get chart series data
        this.chartSerieArray = this.store.select(store => store.signalsData)
        .pipe(
            switchMap(data => data),
            filter( (item: SignalItem, index: number) => {
                return item.analysis_id === this.id;
            })
        );

        this.chartSerieArray.subscribe(
            (data) => {
                this.chartSerie = data.candles;
                
            }
        );
    }

    ngOnInit(): void {
        this.id = "";
        this.route.params.subscribe(async params => {
            console.log(params);
            this.id = params['market'];
        });


        //[START  get order on the current market ]
        this.currentMarketOrders$ = this.store.select(store => store.marketOrderData)
        .pipe(
            map(data => data.filter(
                (item) => {
                    return item.analysis_id === this.id;
                })
            )
        );
        this.currentMarketOrders$.subscribe(
            (data) => {
                console.log(data);
            }
        )
        //[END]



        //[START  get curret market analysis ]
        this.analysis = this.store.select(store => store.analysisData)
        .pipe(
            switchMap(data => data),
            filter( (item: AnalysisDataItem, index: number) => {
                return item.id === this.id;
            })
        );
        this.analysis.subscribe(
            (data) => {
                //this.providedStopLoss =  Math.round( Math.abs((data.stopLoss - data.position)/(data.stopLoss - data.takeProfit) * 100) )  ;
                //this.providedTakeProfit = Math.round( Math.abs((data.takeProfit - data.position)/(data.stopLoss - data.takeProfit) *100) )  ;
                this.stopLoss =  data.stopLoss  ;
                this.takeProfit = data.takeProfit  ;

                this.providedStopLoss = data.stopLoss;
                this.providedTakeProfit = data.takeProfit;
            }
        )

        //Listen to the signal last row  update
        this.store.select(store => store.signalsLastData)
        .pipe(
            switchMap( data => data),
            filter( (item, index) => {
                return item.analysis_id === this.id;
             })
        ).subscribe(
            (data) => {
                //We will use the open price as the base
                //We have OHLC
                console.log("lAST CANDLE ", data);
                if( data != undefined && data.candle != undefined )
                    this.currentPosition = data.candle.y[0];

                //If there were an order before
                //calculate 
            }
        );
        //[END]

        
    }

    /**
     * Handle the user lot input
     * change
     * 
     * Updat the total cost for the user
     * 
     * 
     * @param event 
     */
    lotChange(event){
        this.lot = parseInt(event.target.value);
        this.orderAmount = 
            this.lot * parseInt(this.lotPrice.nativeElement.innerHTML) ;
    }



    makeOrder(type: 'buy' | 'sell'){
        //After order made successfully on
        //backend
        //retuyrn informations

        let order: MarketOrderItem = {
            type: type,
            lot: this.lot,
            amount: this.orderAmount,
            id: NaN,
            benefit: 0,
            member: null,
            stopLess: this.stopLoss,
            takeProfit:this.takeProfit,
            position: this.currentPosition,
            analysis_id: this.id,
            process: {
                lastPosition: this.currentPosition,
                status: "doing",
                closedDate: null,
                benefit: 0,
                id: -1
            }
        }

        console.log(order);

        this.marketOrderApiService.saveOrder(
            {
                position: order.position,
                stop_loss: order.stopLess,
                take_profit: order.takeProfit,
                lot: order.lot,
                amount: order.amount,
                order_type: order.type == "buy" ? "BUY":"SELL" ,
                market_analaysis_id: parseInt(this.id.split("-", 2)[1]),
                member_id: 1
            }
        ).pipe(
            map(data => {
                console.log(data);


                if(data["message"] == null){
                    //Create order process

                    //Check amount herre
                    this.accountAmontManagerService.updateAmount(
                        this.orderAmount,
                        true //We have take an order

                    );

                    //Update the order id
                    order.id = data.id;

                    this.store.dispatch(
                        new CreateMarketOrderItemAction(
                            order
                        )
                    )
                }
            })
        ).subscribe(
            (data) => {
                this.isSaving = false;

                this.toastsService.show(
                    "Success", 
                    "Your order request is being processed. It will be placed soon. Please be patient", 
                    { classname: 'bg-success text-white' }
                );
            },
            (error: HttpErrorResponse) => {

                this.isSaving = false;

                if (error.error instanceof ErrorEvent) {
                    //Client side error
                    console.error('An error occurred:', error.error.message);
                } else {
                        console.error(
                        `Backend returned code ${error.status}, ` +
                        `body was: ${error.error}`);
                }

                console.log(error);
                this.toastsService.show(
                    "Error", 
                    error.error.message, 
                    { classname: 'bg-danger text-white' }
                );

                

               
            }
        )

        
    }

    makeSellOrder(){
        this.makeOrder('sell');
    }

    makeBuyOrder(){
        this.makeOrder('buy');
    }


    closeMarketOrder(order: MarketOrderItem){

        //Instead of call service
        //to close we will dispatch an action
        //that will be handled by the effects manager
        //to process
        //
        //handled [NO]

        this.marketOrderApiService.closeOrder(
            {
                last_position: order.position,
                status: "doing",
                close_date: "",
                benefit: order.process.benefit,
                market_order_id: order.id,
                market_order_process_id: order.process.id,
            }
        ).subscribe(
            (data) => {
                console.log(data);

                //Update the latest statble amount here

                this.store.dispatch(
                    new CloseMarketOrderAction(
                        {
                            id: data.market_order_id,
                            data: null
                        }
                    )
                )
            }
        )

    }


   

   
}
