import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { AbstractAPIRequest } from 'src/app/share/request/abstract-api-request.class';
import { MemberLoginApiRequestInput, MemberLoginApiRequestOutput } from 'src/app/share/types/api/member-api/member-login-api.type';
import { MemberRegisterApiRequestInputInterface, MemberRegisterApiRequestOutputInterface } from 'src/app/share/types/api/member-api/member-register-api.type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService extends AbstractAPIRequest{

    constructor(
        private http: HttpClient
    ) { 
        super(environment.XRADE_API_BASE_URL, "member/auth");
    }


    loginUser(input: MemberLoginApiRequestInput){
        let url = this.RESOURCE_BASE_PATH + `/login`;

        //can update headers here

        return this.http.post<MemberLoginApiRequestOutput>(
            url,
            JSON.stringify(input),
            {
                headers: this.requestHeaders
            }
        ).pipe(
            catchError(this.handleError)
        )

    }

    /**
     * Register a new user
     * 
     * @param input user iformations or credentials 
     * @returns 
     */
    registerUser(input: MemberRegisterApiRequestInputInterface){
        let url = this.RESOURCE_BASE_PATH + `/register`;
        
        return this.http.post<MemberRegisterApiRequestOutputInterface>(
            url,
            JSON.stringify(input),
            {
                headers: this.requestHeaders
            },
        ) 
    }

    getAppToken(){

    }
}
