import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, repeat, switchMap } from 'rxjs/operators';
import { AppState } from 'src/app/store/models/app-state.model';
import { SignalItem } from 'src/app/store/signal/models/signal.model';



declare const CanvasJS: any;



@Component({
  selector: 'app-canvas-js-chart',
  templateUrl: './canvas-js-chart.component.html',
  styleUrls: ['./canvas-js-chart.component.css']
})
export class CanvasJsChartComponent implements OnInit {
    /**
     * Chart container
     */
    chart: any;
    wasInitialized: boolean = false;

    ohclSeries: any[] = [];

    hLineValue: number = 0;

    constructor(
        private store: Store<AppState>,
    ) {
    }
   
    ngOnInit(): void {
        this.chart = new CanvasJS.Chart("chart", {
            animationEnabled: true,
	        theme: "light2", // "light1", "light2", "dark1", "dark2"
            title: {
                text: ""
            },
            axisY: {
                stripLines: {
                    value: this.hLineValue
                }
            },
            data: [
                {
                    type: "candlestick",
                    dataPoints: this.ohclSeries
                }
            ]
        });

        this.store.select(store => store.signalsData)
        .pipe(
            switchMap(data => data),
            filter( (item: SignalItem, index: number) => {
                return item.analysis_id === "mk-1";
            }),
        ).subscribe(
            (data) => {
                for (let i = 0; i < data.candles.length; i++) {
                    this.ohclSeries.push(data.candles[i]);
                }

                //console.log(this.ohclSeries);
                if (this.ohclSeries[this.ohclSeries.length - 1] != undefined){
                    this.hLineValue = this.ohclSeries[this.ohclSeries.length - 1].y[0]
                }
                while (this.ohclSeries.length > 100)  this.ohclSeries.shift();
               
                console.log("Update the chart");
                this.chart.render();
                
            }
        );

        this.wasInitialized = true;
        this.chart.render();
    }

    

}
