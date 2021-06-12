import { AnalysisDataItem } from "../analysis/models/analysis-data.model";
import { MarketOrderItem } from "../order/models/order.model";
import { SignalItem, SignalLastRowItem } from "../signal/models/signal.model";

export interface AppState {
    readonly analysisData: Array<AnalysisDataItem>,
    readonly marketOrderData: Array<MarketOrderItem>,
    readonly signalsData: Array<SignalItem>,
    readonly signalsLastData: Array<SignalLastRowItem>
};