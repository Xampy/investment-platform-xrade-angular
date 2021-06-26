import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { AbstractAPIRequest } from 'src/app/share/request/abstract-api-request.class';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PerfectMoneyService extends AbstractAPIRequest {

    constructor(
        private http: HttpClient
    ) { 
        super(environment.XRADE_API_BASE_URL, "/fill-account/deposit/perfect-money");
    }


    /**
     * Create the perfect money session for handling
     * card payment
     * 
     * @param data payment data 
     * @returns 
     */
     createSession(data: {amount: number}){
        let url = this.RESOURCE_BASE_PATH;
        return this.http.post<{payment_id: string, session_id: string}>(
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
     * Get the perfect money checkout HTML page
     * @param {Object} data 
     * @returns 
     */
    getCheckout(data: {payment_id: string, session_id: string}){
        let url = this.RESOURCE_BASE_PATH + `/checkout?payment_id=${data.payment_id}&session_id=${data.session_id}`;
        return this.http.get(
            url,
            {
                headers: this.requestHeaders,
                responseType: "text"
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
}
