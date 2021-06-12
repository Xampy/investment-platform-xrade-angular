import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { MarketAnalysisDataApiService } from '../services/api/xrade/market-analysis-data/market-analysis-data-api.service';

@Component({
  selector: 'app-page-2',
  templateUrl: './page-2.component.html'
})
export class Page2Component {

  constructor(private appService: AppService,  //API
    ) {
    this.appService.pageTitle = 'Page 2';

   
  }

}
