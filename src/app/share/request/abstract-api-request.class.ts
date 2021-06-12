import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { throwError } from "rxjs";
import { environment } from "src/environments/environment";




/**
 * Abstract API resource
 *
 * defining global attributes and methods
 * on a given api request
 */
export abstract class AbstractAPIRequest {
    /**
     * @var RESOURCE_PATH path to accessing ressource
     */
    protected RESOURCE_BASE_PATH: string;
    protected requestHeaders: HttpHeaders
    protected resuestOptions: {};
    protected API_PROVIDER_URL: string;

    /**
     * Constructor of an api request class
     *
     * @param api_provider the api provider url (often defined in the enironment file)
     * @param pathEnd the resource end point Remember to remove  / at the start of the path
     */
    constructor(api_provider: string, pathEnd: string){
        
        this.setApiProviderUrl(api_provider);
        //Set the resource path end;
        this.setResouceBasePath(pathEnd);
        //Default Header
        this.requestHeaders = new HttpHeaders(
            {
      			"Content-Type": "application/json"
            }
        );

        this.resuestOptions = {
    			headers: this.requestHeaders,
    		}
    }

    /**
     * Set the resource base path
     * url. Using the CONTEXT_PATH defining
     * in environnent file
     *
     * @param pathEnd the resource endpoint as the the name of the resource
     */
    setResouceBasePath(pathEnd: string){
        if( pathEnd.startsWith("/"))
            pathEnd = pathEnd.substring(1);
        this.RESOURCE_BASE_PATH = this.API_PROVIDER_URL + `/${pathEnd}`;
    }

    /**
     * Set the api based path url
     * 
     * @param {string} provider_url 
     */
    setApiProviderUrl(provider_url: string){
        this.API_PROVIDER_URL = provider_url;
    }


    /**
     * Handle eventual error on requests
     *
     *
     * @param error
     * @returns
     */
	protected handleError(error: HttpErrorResponse){
		if (error.error instanceof ErrorEvent) {
			//Client side error
			console.error('An error occurred:', error.error.message);
		  } else {
				console.error(
				`Backend returned code ${error.status}, ` +
				`body was: ${error.error}`);
		}
		return throwError(error);
	}

}
