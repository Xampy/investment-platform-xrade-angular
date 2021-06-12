import { SignalLastRowItem } from "../../signal/models/signal.model";

export interface MarketOrderProcessItem {
    lastPosition: number,
    status: string,
    closedDate: string,
    benefit?: number
    id: number
}

export interface MarketOrderItem {
    type: "buy" | "sell",
    lot: number,
    id?: number, //The market order id
    amount?: number,
    member?: object,
    stopLess: number,
    takeProfit: number,
    position: number,
    analysis_id: string,
    benefit?: number,
    process: MarketOrderProcessItem
}

export interface MarketOrderUpdatePositionData {
    data: SignalLastRowItem,
    extras:{
        TP: number,
        SL: number
    }
}




export interface UpdateOrderProcessInputInterface {
    id: number, data: MarketOrderProcessItem
}

export interface CloseOrderInputInterface extends UpdateOrderProcessInputInterface {}