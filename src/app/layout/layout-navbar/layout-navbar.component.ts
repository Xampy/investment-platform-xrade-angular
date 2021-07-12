import { Component, Input, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AccountDataManagerService } from 'src/app/services/account/account-data-manager.service';
import { AppService } from '../../app.service';
import { LayoutService } from '../../layout/layout.service';

@Component({
  selector: 'app-layout-navbar',
  templateUrl: './layout-navbar.component.html',
  styles: [':host { display: block; }']
})
export class LayoutNavbarComponent implements OnInit{
    isExpanded = false;
    isRTL: boolean;

    @Input() sidenavToggle = true;

    @HostBinding('class.layout-navbar') hostClassMain = true;

    grade: string = "unknow";
    points: number = 0;
    username: string = "";
    entryDateString = "";
    daysEleapsed: number = 0;
    
    constructor(
        private router: Router,
        private appService: AppService, 
        private layoutService: LayoutService,
      
        private memberDataManager: AccountDataManagerService) {

      this.isRTL = appService.isRTL;
    }

    ngOnInit(): void {
        //Get the member subject in order to subscribe to it
        this.memberDataManager.getMemberSubject()
        .subscribe(
            (data) => {
                if(data != null){
                    this.grade = data.grade;
                    this.points = data.point;
                    this.username = data.firstname;

                    this.entryDateString = data.created_at.split(" ", 2)[0];

                    const date1:any = new Date();
                    const date2:any = new Date(data.created_at);
                    const diffTime: any = Math.abs(date2 - date1);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

                    console.log(diffDays);
                    this.daysEleapsed = diffDays;
                }
            }
        )
    }

    

    currentBg() {
      return `bg-${this.appService.layoutNavbarBg}`;
    }

    toggleSidenav() {
      this.layoutService.toggleCollapsed();
    }

    //Added function
    logout(){

        //Clear session storage
        sessionStorage.clear();
        this.router.navigate(['/']).then(
            () => {
                window.location.reload();
            }
        );
    }

    
}
