import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { AbstractAPIRequest } from 'src/app/share/request/abstract-api-request.class';
import { AnalysisApiRequestInput, AnalysisApiRequestOutput } from 'src/app/share/types/api/analysis-api/analysis-api.types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarketAnalysisDataApiService extends AbstractAPIRequest {

    constructor(
        private http: HttpClient
    ) { 
        super(environment.XRADE_API_BASE_URL, "analysis");
    }


    getAll(){

    }
    
    /**
     * Get analysis from server
     * 
     * @param input 
     * @returns 
     */
    getNext(input: AnalysisApiRequestInput){
        let url = this.RESOURCE_BASE_PATH + `?limit=${input.limit}&offset=${input.offset}`;
        return this.http.get<AnalysisApiRequestOutput[]>(
            url,
            {
                headers: this.requestHeaders
            }
        ).pipe(
            catchError(this.handleError)
        );
    }

    /**
     * Get a  single analysis
     * 
     * @param {number} id analysis id
     * @returns {Observalbe}
     */
    getSingle(id: number){
        let url = this.RESOURCE_BASE_PATH + `/single?id=${id}`;
        return this.http.get<AnalysisApiRequestOutput>(
            url,
            {
                headers: this.requestHeaders
            }
        ).pipe(
            catchError(this.handleError)
        );
    }
}
