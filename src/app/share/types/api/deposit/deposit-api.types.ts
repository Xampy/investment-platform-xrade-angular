

export interface BlueShipPayments {
    card: CreditCardInterface
}


export interface CreditCardInterface {
    name: string,
    number: string,
    exp: string,
    cvc: string
}

export class CreditCardItem implements CreditCardInterface {
    name: string;
    number: string;
    exp: string;
    cvc: string;
    
    constructor(){
        this.cvc = "";
        this.exp = "";
        this.name = "";
        this.number = ""
    }
}


export interface MemberDepositApiRequestInputInterface {
    member_account_id: number,
    payment: string,
    amount: number,
    amount_after: number,
    amount_before: number,
    metadata: string,
    filled: boolean,
    date: string
}

export class MemberDepositApiRequestInput implements MemberDepositApiRequestInputInterface {
    member_account_id: number;
    payment: string;
    amount: number;
    amount_after: number;
    amount_before: number;
    metadata: string;
    filled: boolean;
    date: string;
    
    constructor(){
        this.member_account_id = 0; //This is not used by the server
        this.payment = " ";
        this.amount = 0 ;
        this.amount_after = 0 ;
        this.amount_before = 0 ;
        this.metadata = " ";
        this.filled = false;
        this.date =  " ";
    }

    setAmount(amount: number) {
        if(amount <= 0){
            throw new Error("Insufficent amount");
        }else{
            this.amount = amount;
        }
    }

    setPayment(data: string){
        this.payment = data;
    }

    setMetadata(data: string){
        this.metadata = data;
    }
}