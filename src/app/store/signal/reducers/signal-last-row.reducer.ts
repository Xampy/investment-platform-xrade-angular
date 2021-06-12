import { SignalLastRowAction, SignalLastRowActionTypes } from "../actions/signal-last-row.actions";
import { SignalLastRowItem } from "../models/signal.model";


const intitailState: Array<SignalLastRowItem> = [
    {
        analysis_id: "mk-1",
        candle: null
    }
];

export function SignalLastRowReducer(
    state: Array<SignalLastRowItem> = intitailState,
    action: SignalLastRowAction
){
    switch(action.type){
        case SignalLastRowActionTypes.CREATE:
            //Check if the data not already exists
            let position = state.findIndex(
                (item, indew)=> {
                    return item.analysis_id === action.payload.analysis_id;
                }
            );
            if (position < 0) return [...state, action.payload];
            return state;
        case SignalLastRowActionTypes.UPDATE:
            //save the data to update
            let row: SignalLastRowItem = {analysis_id: "", candle:null} 
            position = state.findIndex(
                (item, index)=> {
                    if ( item.analysis_id === action.payload.analysis_id){
                        row.analysis_id = item.analysis_id;
                        return true;
                    }
                }
            );
            //Update the value
            row.candle = action.payload.candle;
            console.log(row);

            return state.map(
                (item, index) => {
                    if(index == position) return row;
                    return  item;
                }
            );
        default:
            return state;
    }
}