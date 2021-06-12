import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AnalysisDataItem } from 'src/app/store/analysis/models/analysis-data.model';
import { AppState } from 'src/app/store/models/app-state.model';

@Component({
  selector: 'app-analysis-list',
  templateUrl: './analysis-list.component.html',
  styleUrls: ['./analysis-list.component.css']
})
export class AnalysisListComponent implements OnInit {


    analysis: Observable<Array<AnalysisDataItem>>;


    constructor(
        private router: Router,
        private store: Store<AppState>
    ) { }

    
    getStopLossPercent(stopLoss: number, takeProfit: number, position: number){
        return Math.round(Math.abs( stopLoss - position ) / Math.abs(stopLoss - takeProfit) * 100);
    }

    getTakeProfitPercent(stopLoss: number, takeProfit: number, position: number){
        return Math.round( Math.abs( takeProfit - position ) / Math.abs(stopLoss - takeProfit) * 100 );
    }

    makeOrder(item: AnalysisDataItem) {
        console.log(item);
        this.router.navigate(['/member/order', 'new', item.id]);
    }

    ngOnInit(): void {
        this.analysis = this.store.select(store => store.analysisData );
    }

}
