import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { AbstractAPIRequest } from 'src/app/share/request/abstract-api-request.class';
import { MemberLoginApiRequestOutput, MemberLoginApiRequestOutputData } from 'src/app/share/types/api/member-api/member-login-api.type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CardPaymentService extends AbstractAPIRequest {

    constructor(
        private http: HttpClient
    ) { 
        super(environment.XRADE_API_BASE_URL, "/fill-account/deposit/bank");
    }

    /**
     * Create the stripe session for handling
     * card payment
     * 
     * @param data payment data 
     * @returns 
     */
    createSession(data: {amount: number, card_data: string}){
        let url = this.RESOURCE_BASE_PATH;
        return this.http.post(
            url,
            JSON.stringify(data),
            {
                headers: this.requestHeaders
            }
        )
        .pipe(
            catchError(this.handleError)
        )
    }

    /**
     * Check if the member jas successfully processed the
     * payment
     * @param data 
     * @returns 
     */
    checkSessionPaymentStatus(data: {session: string}){
        let url = this.RESOURCE_BASE_PATH + "/check";
        return this.http.post<MemberLoginApiRequestOutputData>(
            url,
            JSON.stringify(data),
            {
                headers: this.requestHeaders
            }
        )
        .pipe(
            catchError(this.handleError)
        )
    }
}
