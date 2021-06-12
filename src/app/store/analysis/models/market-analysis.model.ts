import { MarketItem } from "../../market/models/market.model";

export interface MarketAnalysisItem {
    market?: MarketItem;
    totalLot: number;
    availableLot?: number,
    price: number,
    published: boolean
}