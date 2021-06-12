import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, timer } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { AnalysisDataItem } from 'src/app/store/analysis/models/analysis-data.model';
import { AppState } from 'src/app/store/models/app-state.model';
import { UpdateAllOrdersLastPositionAction } from 'src/app/store/order/actions/order.actions';
import { UpdateSignalLastRowItemAction } from 'src/app/store/signal/actions/signal-last-row.actions';
import { UpdateSignalItemAction } from 'src/app/store/signal/actions/signal.actions';
import { CandleInterface, Mt5ApiService } from '../../api/meta-trader/mt5-api.service';

@Injectable({
  providedIn: 'root'
})
export class DefaultDeviseService {
    
    /**
     * It observe the meta trader api
     * and handle values returned
     */
    deviseApiObserver: Observable<Array<CandleInterface>>;

    /**
     * Our current analysis data
     */
    analysis: AnalysisDataItem;

    constructor(
        private metaTraderService: Mt5ApiService,
        private store: Store<AppState>
    ) { 



        //[START  get curret market analysis ]
        this.store.select(store => store.analysisData)
        .pipe(
            switchMap(data => data),
            filter( (item: AnalysisDataItem, index: number) => {
                return item.id === "mk-1";
            })
        ).subscribe(
            (data) => {
                this.analysis = data
            }
        );






        //Get signal candle form 
        //server
        this.deviseApiObserver =  timer(10000, 65 * 1000)
        .pipe(
            switchMap( () =>{ return this.metaTraderService.getCandles(10); } )
        ) 
        this.deviseApiObserver
        .subscribe(
            (data) => {
                //Dispach (create)  and update action
                let action = new UpdateSignalItemAction(
                    {
                        id: "mk-1",
                        candles: data.map(
                            (el) => {
                                return {
                                    x: new Date(el.time),
                                    y: [el.open, el.high, el.low, el.close]
                                }
                            }
                        )
                    }
                );
                this.store.dispatch(
                    action
                );

                //Dispatch the last element
                this.store.dispatch(
                    new UpdateSignalLastRowItemAction(
                        {
                            analysis_id: "mk-1",
                            candle: action.payload.candles[action.payload.candles.length - 1]
                        }
                    )
                )

                //Dispatch to orders tu update the
                //benefits
                this.store.dispatch(
                    new UpdateAllOrdersLastPositionAction(
                        {
                            data: {
                                analysis_id: "mk-1",
                                candle: action.payload.candles[action.payload.candles.length - 1]
                            },
                            extras: {
                                TP: this.analysis.takeProfit,
                                SL: this.analysis.stopLoss
                            }
                        }
                    )
                )
            }   
        );
    }
}
