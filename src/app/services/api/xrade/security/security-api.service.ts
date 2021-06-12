import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { AbstractAPIRequest } from 'src/app/share/request/abstract-api-request.class';
import { MemberLoginApiRequestOutputData } from 'src/app/share/types/api/member-api/member-login-api.type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SecurityApiService extends AbstractAPIRequest {

    constructor(
        private http: HttpClient
    ) { 
        super(environment.XRADE_API_BASE_URL, "member/security");
    }


    /**
     * Get the member the member data
     */
    getMemberData(){
        let url = this.RESOURCE_BASE_PATH + `/data`;
        return this.http.get<MemberLoginApiRequestOutputData>(
            url,
            {
                headers: this.requestHeaders
            }
        ).pipe(
            catchError(this.handleError)
        )
    }

    /**
     * Verify if there is a member with
     * the given reference
     * 
     * @param reference reference to check
     */
    verifyMemberReference(reference: string){
        let url = this.RESOURCE_BASE_PATH + `/reference/check`;
        return this.http.get<{status: "valid" | "invalid"}>(
            url,
            {
                headers: this.requestHeaders,
                params: new HttpParams().append("reference", reference)
            }
        ).pipe(
            catchError(this.handleError)
        )
    }
}
