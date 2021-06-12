import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthApiService } from 'src/app/services/api/xrade/auth/auth-api.service';
import { SecurityApiService } from 'src/app/services/api/xrade/security/security-api.service';
import { AppToastService } from 'src/app/services/component/app-toast.service';
import { MemberRegisterApiRequestInput } from 'src/app/share/model/member.model';
import { AsyncMemberReferenceValidator } from 'src/app/share/validators/async-reference.validator';



declare var $: any;


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit,  AfterViewInit {

    @Input()
    member: MemberRegisterApiRequestInput;
    registerForm: FormGroup;


    isLogging: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private memberRefrenceValidator: AsyncMemberReferenceValidator,
        private securityService: SecurityApiService,
        private authApiService: AuthApiService,
        private toastsService: AppToastService,
    ) { 
        this.member = new MemberRegisterApiRequestInput();
    }


    


    intiRegisterForm(){
        this.registerForm = this.formBuilder.group({
            referrer: ['Xampy', 
                [
                    Validators.required
                ],

            ],
            email: [null, 
                [
                    Validators.required,
                    Validators.email
                ]
            ],
            country: [null, 
                [
                    Validators.required
                ]
            ],
            telephone: [null, 
                [
                    Validators.required
                ]
            ],
            password: [null, 
                [
                    Validators.required,
                    Validators.minLength(4)
                ]
            ],
            confirm_password: [null, 
                [
                    Validators.required,
                ]
            ]
        });
    }


    countryChangeHandler(event){
        this.registerForm.get("country").setValue(event.target.value, {
            onlySelf: true
        });
    }

    

    onSubmit(){
        console.log(this.registerForm);

        //Before check if we were not
        //cjecking the referrer id

        if(this.registerForm.invalid){
            this.toastsService.show("Error", "Check your errors on form", { classname: 'bg-danger text-white' });
            this.isLogging = false;
        }else{
            //Check the sponsor id
            this.isLogging = true;
            this.securityService.verifyMemberReference(this.registerForm.get("referrer").value)
            .subscribe(
                (data) => {
                    console.log(data);
                    if( data.status == "valid"){
                        //Check password
                        if(this.registerForm.get("password").value != this.registerForm.get("confirm_password").value){
                            this.isLogging = false;
                            this.toastsService.show("Error", 
                                "Please review your password confirmation...", 
                                { classname: 'bg-danger text-white' });
                        }else{
                            //Construct the request input
                            this.member.email = this.registerForm.get("email").value;
                            this.member.referenced = this.registerForm.get("referrer").value;
                            this.member.phone = this.registerForm.get("telephone").value;
                            this.member.password = this.registerForm.get("password").value;
                            this.member.country = this.registerForm.get("country").value;

                            console.log(this.member);

                            this.authApiService.registerUser(this.member)
                            .subscribe(
                                (data) => {
                                    this.isLogging = false;
                                    console.log(data);
                                    this.toastsService.show("Success", 
                                        "Sucessfully registered... Please wait", { classname: 'bg-success text-white' });
                                },
                                (error) => {
                                    this.isLogging = false;
                                    this.toastsService.show("Error", error.error.message, { classname: 'bg-danger text-white' });
                                }
                            )
                        }
                    }else{
                        this.toastsService.show("Error", "Invalid sponsor id...Please try later", { classname: 'bg-danger text-white' });
                    }
                },
                (error) => {
                    this.isLogging = false;
                    this.toastsService.show("Error", error.error.message, { classname: 'bg-danger text-white' });
                }
            )
            
            
        }
    }


    ngOnInit(): void {
        this.intiRegisterForm()
    }

    ngAfterViewInit(): void {
        

       
    }

}
