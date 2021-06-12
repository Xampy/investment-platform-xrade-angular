import { Action } from "@ngrx/store";
import { CandleStick, SignalItem } from "../models/signal.model";

export enum SignalActionTypes {
    CREATE = "[SIGNAL] Create signal",
    UPDATE= "[SIGNAL] Update signal"
}

export class CreateSignalItemAction implements Action {
    readonly type =  SignalActionTypes.CREATE;
    constructor(public payload: SignalItem){}
}

export class UpdateSignalItemAction implements Action {
    readonly type = SignalActionTypes.UPDATE;
    constructor(
        public payload: { id: string, candles: Array<CandleStick> }
    ){}
}

export type SignalAction = CreateSignalItemAction | UpdateSignalItemAction ;