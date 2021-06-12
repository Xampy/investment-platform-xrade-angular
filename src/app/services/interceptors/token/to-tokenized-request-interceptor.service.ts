import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToTokenizedRequestInterceptorService implements HttpInterceptor {

  constructor() { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //Here set the authorisation to the token got from authentification
        
        let incomingToken = req.headers;
        console.log("incomming request token ", incomingToken, req.headers);

        

        let token = sessionStorage.getItem("member_token") !== null? sessionStorage.getItem("member_token") : "" ; 
        console.log(token);

        let clonedRequest = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
                'Cache-Control': 'no-cache',
                Pragma: 'no-cache'
            }
        });
        
        console.log(clonedRequest);
        
        return next.handle(clonedRequest);
  }
}