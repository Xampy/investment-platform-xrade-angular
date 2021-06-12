import { Component, Input, AfterViewInit, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountAmountManagerService } from 'src/app/services/account/account-amount-manager.service';
import { AccountDataManagerService } from 'src/app/services/account/account-data-manager.service';
import { AppService } from '../../app.service';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-layout-sidenav',
  templateUrl: './layout-sidenav.component.html',
  styles: [':host { display: block; }']
})
export class LayoutSidenavComponent implements OnInit, AfterViewInit {
    @Input() orientation = 'vertical';

    @HostBinding('class.layout-sidenav') hostClassVertical = false;
    @HostBinding('class.layout-sidenav-horizontal') hostClassHorizontal = false;
    @HostBinding('class.flex-grow-0') hostClassFlex = false;
    
    
    /**
     * User account currdnt amount
     */
    accountAmount: number = 0.00;

    /**
     * The latest stable amount
     * It concern making orders
     */
    lastStableAmount: number = 0;

    showOrderMenu: boolean = false;

    constructor(
      private router: Router, 
      private appService: AppService, 
      private layoutService: LayoutService,
      private accountAmountManagerService: AccountAmountManagerService,
      private memberDataManager: AccountDataManagerService,
      ) {
      // Set host classes
      this.hostClassVertical = this.orientation !== 'horizontal';
      this.hostClassHorizontal = !this.hostClassVertical;
      this.hostClassFlex = this.hostClassHorizontal;
    }


    ngOnInit(): void {
      
      //Subscribe to member data and get
      //the amount
      this.memberDataManager.getMemberSubject()
      .subscribe(
        (data) => {
          //Check the member is not nulll
          if(data != null){
            //then set the amount value
            this.accountAmount = data.account.amount + data.interest_account.amount;
          }
        }
      )

      //[START] observing the account amount value
      /*this.accountAmountManagerService.getCurrentAmountSubject()
      .subscribe(
        (value) => {
          console.log("Got new value for amount, ", value)
          this.accountAmount = value;
        }
      )

      this.accountAmountManagerService.getLastStableAmountSubject()
      .subscribe(
        (value) => {
          this.lastStableAmount = value;
        }
      )*/
      //[END]
    }

    ngAfterViewInit() {
      // Safari bugfix
      this.layoutService._redrawLayoutSidenav();
    }

    getClasses() {
      let bg = this.appService.layoutSidenavBg;

      if (this.orientation === 'horizontal' && (bg.indexOf(' sidenav-dark') !== -1 || bg.indexOf(' sidenav-light') !== -1)) {
        bg = bg
          .replace(' sidenav-dark', '')
          .replace(' sidenav-light', '')
          .replace('-darker', '')
          .replace('-dark', '');
      }

      return `${this.orientation === 'horizontal' ? 'container-p-x ' : ''} bg-${bg}`;
    }

    isActive(url) {
      return this.router.isActive(url, true);
    }

    isMenuActive(url) {
      return this.router.isActive(url, false);
    }

    isMenuOpen(url) {
      return this.router.isActive(url, false) && this.orientation !== 'horizontal';
    }

    toggleSidenav() {
      this.layoutService.toggleCollapsed();
    }



    
}
