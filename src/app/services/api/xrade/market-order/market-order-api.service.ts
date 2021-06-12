import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { AbstractAPIRequest } from 'src/app/share/request/abstract-api-request.class';
import { MakeOrderApiRequestInput, MakeOrderApiRequestOutput, OrderProcessApiRequestInput, OrderProcessApiRequestOutput } from 'src/app/share/types/api/order-api/order-api.types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarketOrderApiService extends AbstractAPIRequest {

    constructor(
        private http: HttpClient
    ) { 
        super(environment.XRADE_API_BASE_URL, "order");
    }
    

    getOrders(){
        let url = this.RESOURCE_BASE_PATH + "";
        return this.http.get<MakeOrderApiRequestOutput>(
            url,
            {
                headers: this.requestHeaders
            }
        ).pipe(
            catchError(this.handleError)
        );;
    }

    saveOrder(input: MakeOrderApiRequestInput){
        let url = this.RESOURCE_BASE_PATH + "";
        return this.http.post<MakeOrderApiRequestOutput>(
            url,
            JSON.stringify(input),
            {
                headers: this.requestHeaders
            }
        ).pipe(
            catchError(this.handleError)
        );;
    }

    /**
     * Create process for an order
     * 
     * @param input 
     * @returns 
     */
    saveOrderProcess(input: OrderProcessApiRequestInput){
        let url = this.RESOURCE_BASE_PATH + "/process";
        return this.http.post<OrderProcessApiRequestOutput>(
            url,
            JSON.stringify(input),
            {
                headers: this.requestHeaders
            }
        ).pipe(
            catchError(this.handleError)
        );;
    }

    /**
     * Update an order process
     * 
     * @param input 
     * @returns 
     */
    updateOrderProcess(input: OrderProcessApiRequestInput){
        let url = this.RESOURCE_BASE_PATH + "/process";
        return this.http.put<OrderProcessApiRequestOutput>(
            url,
            JSON.stringify(input),
            {
                headers: this.requestHeaders
            }
        ).pipe(
            catchError(this.handleError)
        );;
    }

    /**
     * Close an order
     * 
     * @param input 
     * @returns 
     */
     closeOrder(input: OrderProcessApiRequestInput){
        let url = this.RESOURCE_BASE_PATH + "/close";
        return this.http.post<OrderProcessApiRequestOutput>(
            url,
            JSON.stringify(input),
            {
                headers: this.requestHeaders
            }
        ).pipe(
            catchError(this.handleError)
        );;
    }
}
