import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { AbstractAPIRequest } from 'src/app/share/request/abstract-api-request.class';
import { MemberDepositApiRequestInputInterface } from 'src/app/share/types/api/deposit/deposit-api.types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MemberDepositApiService extends AbstractAPIRequest {

    constructor(
        private http: HttpClient
    ) { 
        super(environment.XRADE_API_BASE_URL, "member/fund");
    }

    createDepositRequest(input: MemberDepositApiRequestInputInterface){
        let url = this.RESOURCE_BASE_PATH + `/deposit`;
        return this.http.post(
            url,
            JSON.stringify(input),
            {
                headers: this.requestHeaders
            }
        ).pipe(
            catchError(this.handleError)
        )
    }
}
