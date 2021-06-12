import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, Event as RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, timer } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { AppService } from './app.service';
import { LayoutService } from './layout/layout.service';
import { AccountAmountManagerService } from './services/account/account-amount-manager.service';
import { CandleInterface, Mt5ApiService } from './services/api/meta-trader/mt5-api.service';
import { MarketAnalysisDataApiService } from './services/api/xrade/market-analysis-data/market-analysis-data-api.service';
import { DefaultDeviseService } from './services/observers/devise/default-devise.service';
import { OrderAccountAmountObserverService } from './services/observers/order/order-account-amount-observer.service';
import { AnalysisApiRequestOutput } from './share/types/api/analysis-api/analysis-api.types';
import { AddAnalysisDataItemAction, UpdateAnalysisDataItemAction } from './store/analysis/actions/analysis-data.action';
import { AnalysisDataItem } from './store/analysis/models/analysis-data.model';
import { AppState } from './store/models/app-state.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [':host { display: block; }']
})
export class AppComponent implements OnInit, OnDestroy {

    constructor(
        private router: Router, 
        private appService: AppService, 
        private layoutService: LayoutService,
        
        private store: Store<AppState>,
        private observersDeviseService: DefaultDeviseService,
        private orderAmountService: OrderAccountAmountObserverService,
        private accountAmontManagerService: AccountAmountManagerService,

        //Xrade API
        private marketAnalysisDataApiService: MarketAnalysisDataApiService

    
        
        
        ) {
        // Subscribe to router events to handle page transition
        this.router.events.subscribe(this.navigationInterceptor.bind(this));

        // Disable animations and transitions in IE10 to increase performance
        if (typeof (document as any).documentMode === 'number' && (document as any).documentMode < 11) {
        const style = document.createElement('style');
        style.textContent = `
            * {
            -ms-animation: none !important;
            animation: none !important;
            -ms-transition: none !important;
            transition: none !important;
            }`;
        document.head.appendChild(style);
        }
    }
    ngOnInit(): void {
        
        //App initialized
    }
    
    

    private navigationInterceptor(e: RouterEvent) {
        if (e instanceof NavigationStart) {
        // Set loading state
        document.body.classList.add('app-loading');
        }

        if (e instanceof NavigationEnd) {
        // Scroll to top of the page
        this.appService.scrollTop(0, 0);
        }

        if (e instanceof NavigationEnd || e instanceof NavigationCancel || e instanceof NavigationError) {
        // On small screens collapse sidenav
        if (this.layoutService.isSmallScreen() && !this.layoutService.isCollapsed()) {
            setTimeout(() => this.layoutService.setCollapsed(true, true), 10);
        }

        // Remove loading state
        document.body.classList.remove('app-loading');
        }
    }






    

    ngOnDestroy(): void {
        //this.deviseApiObserver.
    }
}
