import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { PerfectMoneyService } from 'src/app/services/api/xrade/payment/perfect-money/perfect-money.service';

interface PerfectMoneyDataInterface {
    PAYEE_ACCOUNT: string,
    PAYEE_NAME: string,
    PAYMENT_AMOUNT: string,
    PAYMENT_UNITS: "USD",
    STATUS_URL: string,
    PAYMENT_URL: string,
    PAYMENT_URL_METHOD: "POST",
    NOPAYMENT_URL: string,
    NOPAYMENT_URL_METHOD: "POST",
    BAGGAGE_FIELDS: string,
    ORDER_NUM: string,
    CUST_NUM: string,
    PAYMENT_METHOD: string
}


@Component({
  selector: 'app-perfect-money-component',
  templateUrl: './perfect-money-component.component.html',
  styleUrls: ['./perfect-money-component.component.css']
})
export class PerfectMoneyComponentComponent implements OnInit {

    session: {payment_id: string, session_id: string} =null;
    isLoading: boolean = false;
    checkout: Window;

    constructor(
        private perfectMoneyService: PerfectMoneyService
    ) { 
        
    }

    ngOnInit(): void {
    }

    updateSession(session: {payment_id: string, session_id: string}){
        this.session = session;
    }
    getCheckout(){
        console.log(this.session);
        this.isLoading = true;

        if(this.session != null){
            this.perfectMoneyService.getCheckout(this.session)
            .subscribe(
                (response) => {
                    this.isLoading = false;
                    console.log(response);

                    this.checkout = window.open("about:blank", "", "", false);
                    this.checkout.document.write(response);

                    //this.checkout.location.href = "https://perfectmoney.is/api/step1.asp";
                },
                (error) => {
                    this.isLoading = false;
                    console.error(error);
                    
                }
            );
        }

        
    }

}
