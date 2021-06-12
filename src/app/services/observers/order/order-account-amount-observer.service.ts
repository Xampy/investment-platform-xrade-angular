import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { AppState } from 'src/app/store/models/app-state.model';




interface OrderAmountHandler {
    amount: number,
    benefit: number
}

@Injectable({
  providedIn: 'root'
})
export class OrderAccountAmountObserverService {
    orderAmountObserver$: Observable<OrderAmountHandler[]>;


    constructor(
        private store: Store<AppState>
    ) {

        this.orderAmountObserver$ = this.store.select(store => store.marketOrderData)
        .pipe(
            map(
                orders => {
                    return orders.map(
                        (order, index) => {
                            let d: OrderAmountHandler = {
                                amount: order.amount,
                                benefit: order.benefit
                            }
                            return  d;
                        }
                    ).filter(
                        (oa, index) => { return oa.benefit !== 0 }
                    );
                    
                }
            )
        );

    }



    getOrderAmountOberserver(){
        return this.orderAmountObserver$;
    }
}
