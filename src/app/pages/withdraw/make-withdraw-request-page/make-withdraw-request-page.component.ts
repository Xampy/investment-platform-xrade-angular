import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { Stripe, loadStripe } from '@stripe/stripe-js';
import { AccountDataManagerService } from 'src/app/services/account/account-data-manager.service';
import { MemberDepositApiService } from 'src/app/services/api/xrade/fund/deposit/member-deposit-api.service';
import { MemberWithdrawApiService } from 'src/app/services/api/xrade/fund/withdraw/member-withdraw-api.service';
import { AppToastService } from 'src/app/services/component/app-toast.service';
import { MemberLoginApiRequestOutputData } from 'src/app/share/types/api/member-api/member-login-api.type';
import { MemberWithdrawApiRequestInput } from 'src/app/share/types/api/withdraw-api/withdraw-api.types';

@Component({
    selector: 'app-make-withdraw-request-page',
    templateUrl: './make-withdraw-request-page.component.html',
    styleUrls: ['./make-withdraw-request-page.component.css']
})
export class MakeWithdrawRequestPageComponent implements OnInit {

    constructor() {
        
    }

    ngOnInit(): void {
    }

}
