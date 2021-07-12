import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Stripe } from '@stripe/stripe-js';
import { CardPaymentService } from 'src/app/services/api/xrade/payment/card/card-payment.service';
import { AppToastService } from 'src/app/services/component/app-toast.service';
import { BlueShipPayments, CreditCardInterface, CreditCardItem } from 'src/app/share/types/api/deposit/deposit-api.types';

@Component({
    selector: 'app-credit-card-component',
    templateUrl: './credit-card-component.component.html',
    styleUrls: ['./credit-card-component.component.css']
})
export class CreditCardComponentComponent implements OnInit {

    @Input()
    stripe: Stripe = null;

    card: CreditCardItem = new CreditCardItem();
    amount: number = 0;
    isPaying: boolean = false;



    constructor(
        private cardPaymentApiService: CardPaymentService,
        private toastsService: AppToastService,
    ) { }

    ngOnInit(): void {
        //Load the localstorage payment card
        let p: BlueShipPayments = JSON.parse(localStorage.getItem("blueship_payments"));
        
    }

    public getCard(): CreditCardInterface {
        return this.card;
    }



    pay() {

        if (this.stripe != null) {
            this.isPaying = true;
            this.cardPaymentApiService.createSession({ amount: this.amount, card_data: "" },)
                .subscribe(
                    (data: any) => {
                        console.log(data);
                        this.isPaying = false;
                        this.toastsService.show(
                            "Success",
                            "Redirecting to Checkout page",
                            { classname: 'bg-success text-white' });
                        //Persist the payment token
                        sessionStorage.setItem("card_payment_token", data.token);

                        //We have got a session
                        //try to save the credit card data
                        let p: BlueShipPayments = JSON.parse(localStorage.getItem("blueship_payments"));


                        this.stripe.redirectToCheckout({ sessionId: data.id });
                    },
                    (error: HttpErrorResponse) => {
                        this.isPaying = false;
                        this.toastsService.show("Error", error.error.message, { classname: 'bg-danger text-white' });
                    }
                );
        }else{
            this.toastsService.show("Error", "An error occured. Please try again later", { classname: 'bg-danger text-white' });
        }
    }

}
