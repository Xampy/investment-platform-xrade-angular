import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { Stripe, loadStripe } from '@stripe/stripe-js';
import { AccountDataManagerService } from 'src/app/services/account/account-data-manager.service';
import { MemberDepositApiService } from 'src/app/services/api/xrade/fund/deposit/member-deposit-api.service';
import { MemberWithdrawApiService } from 'src/app/services/api/xrade/fund/withdraw/member-withdraw-api.service';
import { AppToastService } from 'src/app/services/component/app-toast.service';
import { MemberWithdrawApiRequestInput } from 'src/app/share/types/api/withdraw-api/withdraw-api.types';

@Component({
  selector: 'app-make-withdraw-request-page',
  templateUrl: './make-withdraw-request-page.component.html',
  styleUrls: ['./make-withdraw-request-page.component.css']
})
export class MakeWithdrawRequestPageComponent implements OnInit {

    
    /**
     * 
     */
     paymentMethod: "bank" | "other";
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
         public memberService: AccountDataManagerService,
         private withdrawApiService: MemberWithdrawApiService,
         private toastsService: AppToastService,
     ) { }
 
     
     
     ngOnInit(): void {
         
        
     }
 
    requestWithdraw(){


        //Init a deposit request here
        this.isPaying = true;
        let depositRequest: MemberWithdrawApiRequestInput = new MemberWithdrawApiRequestInput();
        depositRequest.setAmount(10);
        depositRequest.setPayment("other");
        depositRequest.setMetadata(this.metadata);

        this.withdrawApiService.createWithdrawRequest(depositRequest)
        .subscribe(
            (data: any) => {
                console.log(data);
                this.isPaying = false;


                this.toastsService.show("Success", "Your withdraw request is being processed. It will take 24h. Please be patient", { classname: 'bg-success text-white' });
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
