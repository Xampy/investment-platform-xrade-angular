import { SignalAction, SignalActionTypes } from "../actions/signal.actions";
import { SignalItem } from "../models/signal.model";


const CANDLES_MAX = 30;


const initialState: Array<SignalItem> = [
    {
        analysis_id: "mk-1",
        candles: []
    }
]
export function SignalReducer(
    state: Array<SignalItem> = initialState,
    action: SignalAction
){
    switch(action.type){
        case SignalActionTypes.CREATE:
            return [...state, action.payload];
        case SignalActionTypes.UPDATE:

            //Get the signal by id
            let position = -1;
            let signal: SignalItem = {analysis_id: "", candles: [] };
            position = state.findIndex((item, index) => {
                if (item.analysis_id === action.payload.id){
                    signal.analysis_id = item.analysis_id;
                    signal.candles = [...item.candles];
                    return true;
                }
            });

            console.log("Found position ", position);
            //console.log(signal.candles);
            //console.log(state[position]);

            signal.candles = [...signal.candles, ...action.payload.candles];
            //Check the maximum candles rule
            while (signal.candles.length > 100)  signal.candles.shift();
            
            /*state = state.map(
                (itemn, index) => {
                    if (index != position)
                        return itemn;
                    return signal;
                }
            );*/
            //console.log(state[position]);

            return [...state.slice(0, position), signal, ...state.slice(position + 1)];
        default:
            return state; 
    }
}