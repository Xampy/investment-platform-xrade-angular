
export interface MemberWithdrawalHistoryRowInterface {
    date: string,
    amount: number,
    amount_after: number,
    payment: string,
    filled: boolean,
    amount_before: number
}
export interface MemberWithdrawApiRequestInputInterface {
    member_account_id: number,
    payment: string,
    amount: number,
    amount_after: number,
    amount_before: number,
    metadata: string,
    filled: boolean,
    date: string
}

export class MemberWithdrawApiRequestInput implements MemberWithdrawApiRequestInputInterface {
    member_account_id: number;
    payment: string;
    amount: number;
    amount_after: number;
    amount_before: number;
    metadata: string;
    filled: boolean;
    date: string;

    constructor() {
        this.member_account_id = 0; //This is not used by the server
        this.payment = " ";
        this.amount = 0;
        this.amount_after = 0;
        this.amount_before = 0;
        this.metadata = " ";
        this.filled = false;
        this.date = " ";
    }

    setAmount(amount: number) {
        if (amount <= 0) {
            throw new Error("Insufficent amount");
        } else {
            this.amount = amount;
        }
    }

    setPayment(data: string) {
        this.payment = data;
    }

    setMetadata(data: string) {
        this.metadata = data;
    }
}