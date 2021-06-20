import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityApiService } from 'src/app/services/api/xrade/security/security-api.service';
import { AppToastService } from 'src/app/services/component/app-toast.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

    code: string = "";
    token: string = null;
    isVerifying: boolean = false;
    successMessage: string = null;

    constructor(
        private securityApiService: SecurityApiService,
        private router: Router,
        private toastsService: AppToastService,
    ) { 
        //Try to get the verificationtoken
        this.token = sessionStorage.getItem("verification_token");
    }

    ngOnInit(): void {
    }


    verifyAccount(){

        if(this.code.length == 6 && this.token != null){
            this.isVerifying = true;
            this.securityApiService.verifyAccount(this.token, this.code)
            .subscribe(
                (data) => {
                    this.isVerifying = false;
                    sessionStorage.clear();

                    this.toastsService.show("Success",
                    "Sucessfully registered... Please wait", { classname: 'bg-success text-white' });
                    this.successMessage = "Your account has been successfull verified...Please wait";

                    setTimeout(() => {
                        this.router.navigate(["/auth", "login"]);
                    }, 1000 * 3);
                    
                }
            ),
            (error) => {
                this.isVerifying = false;
                this.toastsService.show("Error", error.error.message, { classname: 'bg-danger text-white' });
            }
        }else{
            this.toastsService.show("Error", "Unable to process the request", { classname: 'bg-danger text-white' });
        }

    }

}
