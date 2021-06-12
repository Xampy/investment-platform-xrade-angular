import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { AccountDataManagerService } from './account-data-manager.service';

@Injectable({
  providedIn: 'root'
})
export class AccountAmountManagerService {

    /**
     * The initail amount got from the account
     * of the members before started any transaction
     * during the session
     */
    initialAmount: number = 0.00;
    /**
     * Always on trading
     * The value of the current 
     */
    currentAmount: number = this.initialAmount;
    currentAmountSubject = new BehaviorSubject<number>(this.initialAmount);

    lastStableAmount: number = this.initialAmount;
    lastStableAmountSubject:BehaviorSubject<number> = new BehaviorSubject<number>(this.initialAmount);
    /**
     * Amoutn value updated ?
     * Contains the state of if
     * the current value of the amount is saved on
     * backend server side or not
     */
    amountUpdated: boolean = false;

    constructor(
        private memberDataManagerService: AccountDataManagerService
    ) {


        //Try to load amount from the session storage
        if( this.memberDataManagerService.getData() != null){
            this.initialAmount = this.memberDataManagerService.getData().account.amount;
            this.currentAmount = this.initialAmount;
            this.lastStableAmount = this.initialAmount;
        }

        this.currentAmountSubject.next(this.currentAmount);
        this.lastStableAmountSubject.next(this.currentAmount);
    }

    getAInitialAmount(){
        return this.initialAmount;
    }

    getCurrentAmount(){
        return this.currentAmount;
    }

    getCurrentAmountSubject(){
        return this.currentAmountSubject;
    }

    getLastStableAmount(){
        return this.lastStableAmount;
    }

    getLastStableAmountSubject(){
        return this.lastStableAmountSubject;
    }

    /**
     * Update the user amount with new orders and 
     * orders updates
     * 
     * @param value the value to be added to the stable amount
     * it can be negative  or positive
     * 
     * @param tookOrder state if it's from taken order
     */
    updateAmount(value: number, tookOrder: boolean = false){
        if ( tookOrder ){
            //this.lastStableAmount = this.lastStableAmount - Math.abs(value);
            //Remember when closing to update the last stable amount
            this.currentAmount = this.currentAmount - Math.abs(value);
            console.log("Current amount ", this.currentAmount)
            //Emit the new value
            this.currentAmountSubject.next(this.currentAmount);
            this.lastStableAmountSubject.next(this.lastStableAmount);
            //this.currentAmountSubject.complete();
        }else {
            this.lastStableAmount += value;
            this.currentAmount = this.lastStableAmount;
            console.log("Current amount ", this.currentAmount)
            //Emit the new value
            this.currentAmountSubject.next(this.currentAmount);
            this.lastStableAmountSubject.next(this.lastStableAmount);
            //this.currentAmountSubject.complete();
        }
        
        
    }

    isAmountUpdated(){
        return this.amountUpdated;
    }
}
