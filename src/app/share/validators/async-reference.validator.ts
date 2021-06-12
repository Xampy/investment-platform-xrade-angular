import { AbstractControl, AsyncValidator, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";
import { debounce, debounceTime, map } from "rxjs/operators";
import { SecurityApiService } from "src/app/services/api/xrade/security/security-api.service";


export class AsyncMemberReferenceValidator {

    constructor(
        private securityService: SecurityApiService
    ){
        
    }

    reference(): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            const value:string = "" + control.value;

            //Send request to the server
            return this.securityService.verifyMemberReference(value)
            .pipe(
                debounceTime(500),
                map(
                    (data) => {
                        if(data.status == "invalid"){
                            return {invalid: true};
                        }else {
                            return null;
                        }
                    })
            )

        }
    }

    email() {
        
    }
    
}