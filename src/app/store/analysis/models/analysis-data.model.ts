import { MarketAnalysisItem } from "./market-analysis.model";

export interface AnalysisDataItem {
    id?: string;
    order: "buy" | "sell",
    position: number,
    stopLoss: number,
    takeProfit: number,
    startTime: string,
    endTime: string,
    timeframe: string,

    analysis: MarketAnalysisItem
}
