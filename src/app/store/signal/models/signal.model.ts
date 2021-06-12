
export interface CandleStick {
    x: Date,
    y: number[]
}

export interface SignalItem {
    analysis_id: string,
    candles: Array<CandleStick>
}

export interface SignalLastRowItem {
    analysis_id: string,
    candle: CandleStick
}
