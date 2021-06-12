export interface MakeOrderApiRequestInput {
    position: number,
    stop_loss: number,
    take_profit: number,
    lot: number,
    amount: number,
    order_type: "BUY" | "SELL",
    market_analaysis_id: number,
    member_id: number,
    order_process?: OrderProcessApiRequestOutput
}

export interface MakeOrderApiRequestOutput extends MakeOrderApiRequestInput {
    id?: number
}

export interface OrderProcessApiRequestInput {
    last_position: number,
	status: string,
	close_date: string,
	benefit: number,
    market_order_process_id?: number,
    market_order_id?: number;
    id?: number
}


export interface OrderProcessApiRequestOutput extends OrderProcessApiRequestInput{}