import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { AbstractAPIRequest } from 'src/app/share/request/abstract-api-request.class';
import { MemberInterestPaymentApiRequestOutput } from 'src/app/share/types/api/interest-payment-api/interest-payment-api.types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MemberInterestPaymentApiService extends AbstractAPIRequest {

    constructor(
        private http: HttpClient
    ) { 
        super(environment.XRADE_API_BASE_URL, "member/fund/interest-payment");
    }


    /**
     * Get the latet payment 
     * Payment concern the benefit regarless of orders profit
     * this payment is the provided profit by the plateform
     */
    getLastest(){
        let url = this.RESOURCE_BASE_PATH + `/history`;
        return this.http.get<MemberInterestPaymentApiRequestOutput[]>(
            url,
            {
                headers: this.requestHeaders
            }
        ).pipe(
            catchError(this.handleError)
        )
    }

}
