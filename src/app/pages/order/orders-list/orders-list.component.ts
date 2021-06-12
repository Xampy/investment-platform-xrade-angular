import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { AnalysisDataItem } from 'src/app/store/analysis/models/analysis-data.model';
import { AppState } from 'src/app/store/models/app-state.model';
import { MarketOrderItem } from 'src/app/store/order/models/order.model';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {
    orders: Observable<Array<MarketOrderItem>>;
    /**
     * Sum the total amount
     * of benefit
     */
    totalBenefit: number = 0;

    constructor(
        private store: Store<AppState>
    ) { }

    ngOnInit(): void {
        this.orders = this.store.select(store => store.marketOrderData);
       

        //Get the total of benefit
        this.orders.subscribe(
            (orders) => {
                let t = 0;
               for (const order of orders) {
                   console.log("Summing up ", order.benefit);
                    t += order.benefit;
               }

               this.totalBenefit = t;
                
            }
        )
    }


    getOrderAnalysis(order: MarketOrderItem) {
        return this.store.select(store => store.analysisData)
        .pipe(
            switchMap(data => data),
            filter( (item: AnalysisDataItem, index: number) => {
                return item.id === order.analysis_id;
            })
        )
    }

    orderBenefitIsLoss(order: MarketOrderItem){
        return order.position < 0;
    }

}
