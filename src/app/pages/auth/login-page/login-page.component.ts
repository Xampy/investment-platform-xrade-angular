import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { AccountAmountManagerService } from 'src/app/services/account/account-amount-manager.service';
import { AuthApiService } from 'src/app/services/api/xrade/auth/auth-api.service';
import { AppToastService } from 'src/app/services/component/app-toast.service';
import { MemberLoginApiRequestInput } from 'src/app/share/types/api/member-api/member-login-api.type';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

    signinForm: FormGroup = null;
    isLogging: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authApiService: AuthApiService,

        private amountManagerService: AccountAmountManagerService,
        private toastsService: AppToastService,

        private appService: AppService
    ) { }

    ngOnInit(): void {
        this.intiLoginForm();
    }

    intiLoginForm(){
        this.signinForm = this.formBuilder.group({
            telephone: [null, 
                [
                    Validators.required, 
                    Validators.pattern('([0-9]+) ([0-9]+)')
                ]
            ],
            password: [null, 
                [
                    Validators.required,
                    Validators.minLength(4)
                ]
            ]
        });
    }

    onSubmit() {
        console.log(this.signinForm);

        if ( this.signinForm.invalid ) {

           
        }else {

            this.isLogging = true;
            let credentials: MemberLoginApiRequestInput = {
                phone: this.signinForm.get("telephone").value,
                password: this.signinForm.get("password").value
            }
            this.authApiService.loginUser(credentials)
            .subscribe(
                (data) => {
                    console.log(data);

                    //Check if ws hava the token and the data
                    if(data.token != null){
                        //Persist the token
                        sessionStorage.setItem("member_token", data.token);
                        sessionStorage.setItem("member", JSON.stringify(data.data));

                        //Update the member amount
                        this.amountManagerService.updateAmount(data.data.account.amount, false);
                        this.toastsService.show("Success", 
                        "Sucessfully Log in... Please wait", { classname: 'bg-success text-white' });
                        this.router.navigate([ '/member', 'dashboard']);
                    }


                    
                },

                (error) => {
                    this.isLogging = false;
                    this.toastsService.show("Error", error.error.message, { classname: 'bg-danger text-white' });
                }
            )
            

            
        }
    }

}
