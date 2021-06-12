import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap } from "rxjs/operators";
import { MarketOrderApiService } from "src/app/services/api/xrade/market-order/market-order-api.service";
import { AppToastService } from "src/app/services/component/app-toast.service";
import { CreateMarketOrderItemAction, MarketOrderActionActionTypes, UpdateMarketOrderProcessItemAction } from "../order/actions/order.actions";


@Injectable()
export class OrderEffects {

    @Effect()
    makeingOrder$ = this.actions
    .pipe(
        ofType<CreateMarketOrderItemAction>(MarketOrderActionActionTypes.ADD_MARKET_ORDER),
        mergeMap(
            (data) => {
                return this.marketOrderApiService.saveOrderProcess(
                    {
                        last_position: data.payload.position,
                        status: "doing",
                        close_date: "",
                        benefit: 0,
                        market_order_id: data.payload.id //order.id
                    }
                ).pipe(
                    map(data => {


                            this.toastsService.show(
                                "Success", 
                                "Your order request has been placed", 
                                { classname: 'bg-success text-white' }
                            );

                            return new UpdateMarketOrderProcessItemAction(
                                {
                                    id: data.market_order_id,
                                    data: {
                                        lastPosition: data.last_position,
                                        status: data.status,
                                        closedDate: data.close_date,
                                        benefit: data.benefit,
                                        id: data.id
                                    }
                                }
                            );
                        }
                    )
                )
            }
        )
    )

    constructor(
        private actions: Actions,
        private marketOrderApiService: MarketOrderApiService,
        private toastsService: AppToastService,
    ){

    }
}