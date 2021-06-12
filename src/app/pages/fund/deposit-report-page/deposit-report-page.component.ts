import { Component, OnInit } from '@angular/core';
import { AccountDataManagerService } from 'src/app/services/account/account-data-manager.service';

@Component({
  selector: 'app-deposit-report-page',
  templateUrl: './deposit-report-page.component.html',
  styleUrls: ['./deposit-report-page.component.css']
})
export class DepositReportPageComponent implements OnInit {

    constructor(
      public memberService: AccountDataManagerService,
    ) { }

    ngOnInit(): void {
    }

}
