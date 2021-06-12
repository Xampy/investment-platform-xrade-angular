import { SignalLastRowItem } from "../../signal/models/signal.model";
import { MarketOrderAction, MarketOrderActionActionTypes } from "../actions/order.actions";
import { CloseOrderInputInterface, MarketOrderItem, MarketOrderProcessItem, MarketOrderUpdatePositionData, UpdateOrderProcessInputInterface } from "../models/order.model";

const initialState: Array<MarketOrderItem> = [
]

export function MarketOrderReducer(
    state: Array<MarketOrderItem> = initialState,
    action: MarketOrderAction
){
    switch(action.type){
        case MarketOrderActionActionTypes.ADD_MARKET_ORDER:
            return [action.payload, ...state];
        case MarketOrderActionActionTypes.UPDATE_ORDER_PROCESS:
            return state.map(
                (item, index) => {
                    if(item.id == (action.payload as UpdateOrderProcessInputInterface).id ){
                        //Update data
                        return {
                            type: item.type,
                            lot: item.lot,
                            member: item.member,
                            id: item.id,
                            amount: item.amount,
                            benefit: item.benefit,
                            stopLess: item.stopLess,
                            takeProfit: item.takeProfit,
                            position: item.position,
                            analysis_id: item.analysis_id,
                            process: {
                                lastPosition: (action.payload as  UpdateOrderProcessInputInterface).data.lastPosition,
                                status: (action.payload as  UpdateOrderProcessInputInterface).data.status,
                                closedDate: (action.payload as  UpdateOrderProcessInputInterface).data.closedDate,
                                benefit: (action.payload as  UpdateOrderProcessInputInterface).data.benefit,
                                id: (action.payload as  UpdateOrderProcessInputInterface).data.id
                            }
                        }
                    }

                    return item;
                }
            );
        
        case MarketOrderActionActionTypes.CLOSE_MARKET_ORDER:
            console.log(action.payload);
            return state.filter( (item) => item.id !== (action.payload as CloseOrderInputInterface).id ); 
        case MarketOrderActionActionTypes.UPDATE_ALL_ORDER_LAST_POSITION:
            return state.map(
                (item)=>{
                    if (item.analysis_id == (action.payload as MarketOrderUpdatePositionData).data.analysis_id){
                        let benefit = 
                            (
                                ( (action.payload as MarketOrderUpdatePositionData).data.candle.y[0] - item.position )
                                /(
                                    (action.payload as MarketOrderUpdatePositionData).extras.SL - (action.payload as MarketOrderUpdatePositionData).extras.TP
                                )
                                
    
                            ) * item.amount

                        if (item.type == 'buy'){
                            benefit = benefit > 0 ? benefit : -benefit;
                        }else {
                            benefit = benefit > 0 ? -benefit : benefit;
                        }
                        console.log(benefit);
                        return {
                            type: item.type,
                            lot: item.lot,
                            member: item.member,
                            amount: item.amount,
                            benefit: Number((benefit).toFixed(2)),
                            stopLess: item.stopLess,
                            takeProfit: item.takeProfit,
                            position: item.position,
                            analysis_id: item.analysis_id,
                            process: {
                                lastPosition: (action.payload as MarketOrderUpdatePositionData).data.candle.y[0],
                                status: "doing",
                                closedDate: item.process.closedDate
                            }
                        }
                    }
                    return item;
                }
            );
        default:
            return state;
    }
}