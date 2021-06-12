import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { StripePaymentService } from 'src/app/services/payment/stripe/stripe-payment.service';

import { loadStripe, Stripe } from '@stripe/stripe-js';
import { AccountDataManagerService } from 'src/app/services/account/account-data-manager.service';
import { MemberDepositApiRequestInput, MemberDepositApiRequestInputInterface } from 'src/app/share/types/api/deposit/deposit-api.types';
import { MemberDepositApiService } from 'src/app/services/api/xrade/fund/deposit/member-deposit-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { AppToastService } from 'src/app/services/component/app-toast.service';
import { CardPaymentService } from 'src/app/services/api/payment/card/card-payment.service';
import { ActivatedRoute } from '@angular/router';

//var Coinbase = require('coinbase-commerce-node');

@Component({
  selector: 'app-make-deposit-page',
  templateUrl: './make-deposit-page.component.html',
  styleUrls: ['./make-deposit-page.component.css']
})
export class MakeDepositPageComponent implements OnInit {

    /**
     * 
     */
    paymentMethod: "bank" | "other" | "crypto" | "perfect-money" = null;
    paymentStatus: "success" | "failure" | null = null;
    metadata: string = "";
    isPaying: boolean = false;
    show: boolean = true;

    @Input()
    /**
     * Amount to proceed on payment
     */
    amount: number = 25;

    stripe: Stripe = null;
    
    @ViewChild("errorToast")
    errorToast: NgbToast;

    constructor(
        private stripePaymentService: StripePaymentService,
        public memberService: AccountDataManagerService,
        private depositApiService: MemberDepositApiService,
        private cardPaymentApiService: CardPaymentService,
        private toastsService: AppToastService,
        public memberDataManager: AccountDataManagerService,
        private route: ActivatedRoute
    ) { 
        
    }

    ngOnInit(): void {
        
        loadStripe(
            'pk_test_51H9HTiI0XdkUGFe3Hh4gWb0ghP6eWtSyXEhmpqEwdHWQe8wWgKOqr8wq08ugsPFrnUB4PdCSEanZ2SPo3YZLLZjs00RRooTV38'
        ).then(
            (value: Stripe) => {
                this.stripe = value;
                console.log(value);
            }
        )

        ////Try to get the token url parameter from the route
        this.route.queryParams.subscribe(
            (params) => {
                console.log(params);
                console.log(params["token"])

                if(params["token"] == "verification"){
                    this.isPaying = true;
                    //Check if we have a card_payment in session storage
                    let session:string = sessionStorage.getItem("card_payment_token");
                    if(session != null){
                        this.cardPaymentApiService.checkSessionPaymentStatus({session: session})
                        .subscribe(
                            (data) => {
                                
                                this.memberDataManager.updateMember(data);
                                //clear the card payment session from the statorage
                                sessionStorage.removeItem("card_payment_token");
                                this.isPaying = false;
                                this.toastsService.show(
                                    "Success", 
                                    "Your account has been filled", 
                                    { classname: 'bg-success text-white' });
                            }
                        )
                    }
                }
            }
        )
    }

    pay(){

        if(this.paymentMethod == "bank"){
            if(this.stripe != null)
                this.isPaying = true;
                /*this.stripePaymentService.initPayment()
                .subscribe(
                    (data: any) => {
                        console.log(data);
                        this.stripe.redirectToCheckout({ sessionId: data.id });
                    }
                )*/

                this.cardPaymentApiService.createSession({amount: this.amount})
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
                        this.stripe.redirectToCheckout({ sessionId: data.id });
                    },
                    (error: HttpErrorResponse) => {
                        this.isPaying = false;
                        this.toastsService.show("Error", error.error.message, { classname: 'bg-danger text-white' });     
                    }
                )
        }else if(this.paymentMethod == "other"){
            //Init a deposit request here
            this.isPaying = true;
            let depositRequest: MemberDepositApiRequestInput = new MemberDepositApiRequestInput();
            depositRequest.setAmount(10);
            depositRequest.setPayment("other");
            depositRequest.setMetadata(this.metadata);

            this.depositApiService.createDepositRequest(depositRequest)
            .subscribe(
                (data: any) => {
                    console.log(data);
                    this.isPaying = false;
                    this.toastsService.show("Success", "Your deposit request is being processed. It will take 24h. Please be patient", { classname: 'bg-success text-white' });
                },
                (error: HttpErrorResponse) => {

                    this.isPaying = false;

                    if (error.error instanceof ErrorEvent) {
                        //Client side error
                        console.error('An error occurred:', error.error.message);
                    } else {
                            console.error(
                            `Backend returned code ${error.status}, ` +
                            `body was: ${error.error}`);
                    }

                    console.log(error);
                    console.log(this.errorToast);

                    this.toastsService.show("Error", error.error.message, { classname: 'bg-danger text-white' });

                   
                }
            )

        }
    }

    swithPaymentMethod(way: "bank" | "other" | "crypto" | "perfect-money"){
        console.log(way);
        this.paymentMethod = way;
    }

    payWithCrypto(){

       
    }

}
