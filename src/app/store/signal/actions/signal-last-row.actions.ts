import { Action } from "@ngrx/store";
import { CandleStick, SignalLastRowItem } from "../models/signal.model";


export enum SignalLastRowActionTypes {
    CREATE = "[SIGNAL LAST ROW] Create last signal row",
    UPDATE = "[SIGNAL LAST ROW] Update last signal row"
}


export class CreateSignalLastRowItemAction implements Action{
    readonly type: string = SignalLastRowActionTypes.CREATE;
    constructor(public payload: SignalLastRowItem){} 
}

export class UpdateSignalLastRowItemAction implements Action{
    readonly type: string = SignalLastRowActionTypes.UPDATE;
    constructor(public payload: SignalLastRowItem ){}
    
}

export type SignalLastRowAction = CreateSignalLastRowItemAction;