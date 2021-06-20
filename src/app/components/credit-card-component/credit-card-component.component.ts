import { Component, OnInit } from '@angular/core';
import { BlueShipPayments, CreditCardInterface, CreditCardItem } from 'src/app/share/types/api/deposit/deposit-api.types';

@Component({
  selector: 'app-credit-card-component',
  templateUrl: './credit-card-component.component.html',
  styleUrls: ['./credit-card-component.component.css']
})
export class CreditCardComponentComponent implements OnInit {

    card: CreditCardItem = new CreditCardItem();
    constructor() { }

    ngOnInit(): void {
        //Load the localstorage payment card
        let p: BlueShipPayments = JSON.parse(localStorage.getItem("blueship_payments"));
        if(p != null ){
            this.card.cvc = p.card.cvc;
            this.card.name = p.card.name;
            this.card.number = p.card.number;
            this.card.exp = p.card.exp;
        }
    }

    public getCard(): CreditCardInterface{
        return this.card;
    }

}
