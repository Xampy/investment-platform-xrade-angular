export interface DataAnalysisType {
    order: "buy" | "sell",
    position: number,
    stopLoss: number,
    takeProfit: number,
    startTime: string,
    endTime: string,
}