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
        return this.http.get<{data: MemberLoginApiRequestOutputData}>(
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
        let url = this.RESOURCE_BASE_PATH + `/check/reference`;
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

    /**
     * Verify if there is a member with
     * the given email
     * 
     * @param email reference to check
     */
    verifyMemberEmail(email: string){
        let url = this.RESOURCE_BASE_PATH + `/check/email`;
        return this.http.get<{status: "valid" | "invalid"}>(
            url,
            {
                headers: this.requestHeaders,
                params: new HttpParams().append("email", email)
            }
        ).pipe(
            catchError(this.handleError)
        )
    }

     /**
     * Verify if there is a member with
     * the given phone
     * 
     * @param phone phone to check
     */
      verifyMemberPhone(phone: string){
        let url = this.RESOURCE_BASE_PATH + `/check/phone`;
        return this.http.get<{status: "valid" | "invalid"}>(
            url,
            {
                headers: this.requestHeaders,
                params: new HttpParams().append("phone", phone)
            }
        ).pipe(
            catchError(this.handleError)
        )
    }


     /**
     * Verify if there is a member with
     * the given username
     * 
     * @param username username to check
     */
    verifyMemberUsername(username: string){
        let url = this.RESOURCE_BASE_PATH + `/check/username`;
        return this.http.get<{status: "valid" | "invalid"}>(
            url,
            {
                headers: this.requestHeaders,
                params: new HttpParams().append("username", username)
            }
        ).pipe(
            catchError(this.handleError)
        )
    }

    /**
     * Verify a member email account
     * @param verification_token 
     * @param code 
     * @returns 
     */
    verifyAccount(verification_token: string, code: string){
        let url = this.RESOURCE_BASE_PATH + `/verify-account`;
        return this.http.get<{status: "valid" | "invalid"}>(
            url,
            {
                headers: this.requestHeaders,
                params: new HttpParams().append("verification_token", verification_token).append("code", code)
            }
        ).pipe(
            catchError(this.handleError)
        )
    }




    updatePassword(data: {old_password: string, new_password: string}){
        let url = this.RESOURCE_BASE_PATH + `/update/password`;
        return this.http.post<any>(
            url,
            JSON.stringify(data),
            {
                headers: this.requestHeaders
            }
        ).pipe(
            catchError(this.handleError)
        )
    }
}
