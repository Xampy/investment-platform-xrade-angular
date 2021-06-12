import { AnalysisDataAction, AnalysisDataActionTypes } from "../actions/analysis-data.action";
import { AnalysisDataItem } from "../models/analysis-data.model";

const initialState: Array<AnalysisDataItem> = [
    
]

export function AnalysisDataReducer(
    state: Array<AnalysisDataItem> = initialState, 
    action: AnalysisDataAction 
) {
    switch(action.type) {
        case AnalysisDataActionTypes.ADD_ANALYSIS_DATA: 
            //Check if the analysis already exists
            let index = state.findIndex((item, index) => action.payload.id == item.id);
            if(index > 0) return state;

            return [...state, action.payload];
        case AnalysisDataActionTypes.UPDATE_ANALYSIS_DATA: 
            index = state.findIndex((item, index) => action.payload.id == item.id);
            console.log("Updating Index ", index);
            if( index >= 0){
                return state.map(
                    (item, _index) => {
                        if (_index == index){
                            console.log(action.payload);
                            return action.payload;
                        }
                        return item;
                    }
                );
            }
            return state;
        default:
            return state; 
    }
}