import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { AbstractAPIRequest } from 'src/app/share/request/abstract-api-request.class';
import { InvestmentProfitWidrawalRequestInputData, InvestmentProfitWidrawalRequestOutputData } from 'src/app/share/types/api/investment-api/investment-profit.type';
import { MemberLoginApiRequestOutputData } from 'src/app/share/types/api/member-api/member-login-api.type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvestmentProfitApiService extends AbstractAPIRequest {

    constructor(
        private http: HttpClient
    ) { 
        super(environment.XRADE_API_BASE_URL, "member/fund/investment-profit");
    }

    /**
     * Create de withdral request on the investment profit
     * amount
     * 
     * @param data 
     * @returns 
     */
    createWithdrawalRequest(data: InvestmentProfitWidrawalRequestInputData){
        let url = this.RESOURCE_BASE_PATH + '/withdrawal';
        return this.http.post<InvestmentProfitWidrawalRequestOutputData>(
            url,
            JSON.stringify(data),
            {
                headers: this.requestHeaders
            }
        ).pipe(
            catchError(this.handleError)
        );
    }

    /**
     * Merge interest account and the investment account.
     * 
     * @param {amount: number} data payload containning the amount to be  merged 
     * @returns 
     */
    mergeAccount(data: {amount: number}){
        let url = this.RESOURCE_BASE_PATH + '/merge';
        return this.http.post<MemberLoginApiRequestOutputData>(
            url,
            JSON.stringify(data),
            {
                headers: this.requestHeaders
            }
        ).pipe(
            catchError(this.handleError)
        );
    }
}
