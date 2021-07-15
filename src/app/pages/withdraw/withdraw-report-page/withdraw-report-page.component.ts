import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountDataManagerService } from 'src/app/services/account/account-data-manager.service';
import { MemberWithdrawApiService } from 'src/app/services/api/xrade/fund/withdraw/member-withdraw-api.service';
import { AppToastService } from 'src/app/services/component/app-toast.service';
import { MemberWithdrawalHistoryRowInterface } from 'src/app/share/types/api/withdraw-api/withdraw-api.types';

@Component({
    selector: 'app-withdraw-report-page',
    templateUrl: './withdraw-report-page.component.html',
    styleUrls: ['./withdraw-report-page.component.css']
})
export class WithdrawReportPageComponent implements OnInit {
    requests: MemberWithdrawalHistoryRowInterface[] = [];

    constructor(
        public memberService: AccountDataManagerService,
        private memberWithdrawApiService: MemberWithdrawApiService,
        private toastsService: AppToastService
    ) { }

    ngOnInit(): void {
        this.memberWithdrawApiService.getHistory()
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
