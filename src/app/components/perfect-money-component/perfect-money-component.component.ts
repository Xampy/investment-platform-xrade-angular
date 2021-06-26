import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { PerfectMoneyService } from 'src/app/services/api/xrade/payment/perfect-money/perfect-money.service';
import { AppToastService } from 'src/app/services/component/app-toast.service';

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


declare var $: any;


@Component({
  selector: 'app-perfect-money-component',
  templateUrl: './perfect-money-component.component.html',
  styleUrls: ['./perfect-money-component.component.css']
})
export class PerfectMoneyComponentComponent implements OnInit {

    session: {payment_id: string, session_id: string} = null;
    isLoading: boolean = false;
    checkout: Window;
    amount: number = 0;


    
    form: Element;
    isGettingSession: boolean = false;
    isGettingCheckout: boolean = false;

    constructor(
        private perfectMoneyService: PerfectMoneyService,
        
        private toastsService: AppToastService,
    ) { 
        
    }

    ngOnInit(): void {
    }

    updateSession(session: {payment_id: string, session_id: string}){
        this.session = session;
    }


    sendForm(){        

        this.isGettingCheckout = true;
        $("#perfect-money-form").submit();
    }


    getSession(){
        if(this.amount != 0){

            this.isGettingSession = true;

            this.perfectMoneyService.createSession({amount: this.amount})
            .subscribe(
                (response)=>{
                    this.isGettingSession = false;

                    this.updateSession(response);
                },
                (error) => {
                    this.isGettingSession = false;
                    this.toastsService.show("Error", error.error.message, { classname: 'bg-danger text-white' });
                }
            )
        }else{
            this.toastsService.show("Error", "The amount must be greater than 0", { classname: 'bg-danger text-white' });
        }
    }

}
