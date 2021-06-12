

export interface AnalysisApiRequestInput {
    offset: number,
    limit: number
}

export interface AnalysisApiRequestOutput {
    market: string,
    max_loss: number,
    available_lot: number,
    price: number,
    max_profit: number,
    total_lot: number,
    id: number,
    published: false,
    analysis: {
        market: string,
        start_time: string,
        timeframe: string,
        end_time: string,
        position: number,
        order_type: "BUY" | "SELL"
    }
}