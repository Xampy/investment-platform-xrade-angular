import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StripePaymentService {

    constructor(
        private http: HttpClient
    ) { }
    

    initPayment(){
        let url = `http://localhost:4200/xrade/api/v1/fill-account/deposit/bank`;
        return this.http.post(
            url,
            {}
        )
    }

}
