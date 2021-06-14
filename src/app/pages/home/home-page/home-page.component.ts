import { Component, OnInit } from '@angular/core';
import { AccountDataManagerService } from 'src/app/services/account/account-data-manager.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
    isAuth: boolean = false;

    constructor(
        private memberDataManager: AccountDataManagerService,
    ) { 
        //Subscribe to member data and get
        //the amount
        this.memberDataManager.getMemberSubject()
        .subscribe(
            (data) => {
            //Check the member is not nulll
            if(data != null){
                //then set the amount value
                this.isAuth = true;
            }
            }
        )
    }

    ngOnInit(): void {
    }

}
