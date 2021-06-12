import { Action } from '@ngrx/store';
import { AnalysisDataItem } from '../models/analysis-data.model';

export enum AnalysisDataActionTypes {
    ADD_ANALYSIS_DATA = '[ANALYSIS] Add analysis data',
    UPDATE_ANALYSIS_DATA = '[ANALYSIS] Update analysis data',

    ADD_ANALYSIS_SUCCESS = '[ANALYSIS ADDED SUCCESSFULLY]'
}


export class AddAnalysisDataItemAction implements Action {
    readonly type =  AnalysisDataActionTypes.ADD_ANALYSIS_DATA ;
    constructor(public payload: AnalysisDataItem ){
        console.log("Make up");
    } 

}

export class UpdateAnalysisDataItemAction implements Action {
    readonly type =  AnalysisDataActionTypes.UPDATE_ANALYSIS_DATA ;
    constructor(public payload: AnalysisDataItem ){
        console.log("Make up");
    } 

}

export type AnalysisDataAction = AddAnalysisDataItemAction |  UpdateAnalysisDataItemAction;