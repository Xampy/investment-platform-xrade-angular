import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mergeMap, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';



export interface CandleInterface {
    close: number, 
    high: number, 
    low: number, 
    open: number, 
    time: number
}


@Injectable({
  providedIn: 'root'
})
export class Mt5ApiService {

    constructor(
      private http: HttpClient
    ) { }

    
    /**
     * It only for one devise
     * Need optimizes function to handle
     * all
     * 
     * @param count candles count value
     */
    getCandles(count: number){
        const url = `${environment.META_TRADER_5_API_BASE_URL}/${count}`;
        return this.http.get<Array<CandleInterface>>(
            url,
        )
    }


}
