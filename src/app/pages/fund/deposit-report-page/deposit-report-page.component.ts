import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountDataManagerService } from 'src/app/services/account/account-data-manager.service';
import { MemberDepositApiService } from 'src/app/services/api/xrade/fund/deposit/member-deposit-api.service';
import { AppToastService } from 'src/app/services/component/app-toast.service';
import { MemberDepositHistoryRowInterface } from 'src/app/share/types/api/deposit/deposit-api.types';

@Component({
    selector: 'app-deposit-report-page',
    templateUrl: './deposit-report-page.component.html',
    styleUrls: ['./deposit-report-page.component.css']
})
export class DepositReportPageComponent implements OnInit {
    requests: MemberDepositHistoryRowInterface[] = [];

    constructor(
        public memberService: AccountDataManagerService,
        private memberDepositApiService: MemberDepositApiService,
        private toastsService: AppToastService
    ) { }

    ngOnInit(): void {
        this.memberDepositApiService.getHistory()
        .subscribe(
            (data) => {
                this.requests = data;
            },
            (error: HttpErrorResponse) => {
                this.toastsService.show("Error", error.error.message, { classname: 'bg-danger text-white' });
            }
        )
    }

}
