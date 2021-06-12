import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ToTokenizedRequestInterceptorService } from "./token/to-tokenized-request-interceptor.service";


/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [

    //Tokenizing request 
    //tranform a request to a tokenized request
    { 
        provide: HTTP_INTERCEPTORS, 
        useClass: ToTokenizedRequestInterceptorService, 
        multi: true 
    },
  ];