import { Action } from "@ngrx/store"
import { SignalLastRowItem } from "../../signal/models/signal.model";
import { CloseOrderInputInterface, MarketOrderItem, MarketOrderProcessItem, MarketOrderUpdatePositionData, UpdateOrderProcessInputInterface } from "../models/order.model";

export enum MarketOrderActionActionTypes {
    ADD_MARKET_ORDER = '[ORDER] Add market order',
    UPDATE_ORDER_PROCESS = '[ORDER] Update  order process',
    UPDATE_ALL_ORDER_LAST_POSITION = '[ORDER] Update all orders lasst position',

    CLOSE_MARKET_ORDER = "[ORDER] Close a market order"
}

export class CreateMarketOrderItemAction implements Action {
    readonly type: string = MarketOrderActionActionTypes.ADD_MARKET_ORDER;
    constructor(public payload: MarketOrderItem){}
}


export class UpdateMarketOrderProcessItemAction implements Action {
    readonly type: string = MarketOrderActionActionTypes.UPDATE_ORDER_PROCESS;
    constructor(public payload: UpdateOrderProcessInputInterface ){}
}

export class CloseMarketOrderAction implements Action {
    readonly type: string = MarketOrderActionActionTypes.CLOSE_MARKET_ORDER;
    constructor(public payload: CloseOrderInputInterface ){}
}

export class UpdateAllOrdersLastPositionAction implements Action {
    readonly type: string = MarketOrderActionActionTypes.UPDATE_ALL_ORDER_LAST_POSITION;
    constructor(
        public payload: MarketOrderUpdatePositionData){}

}

export type MarketOrderAction = 
CreateMarketOrderItemAction 
| UpdateAllOrdersLastPositionAction 
| UpdateMarketOrderProcessItemAction 
| CloseMarketOrderAction;