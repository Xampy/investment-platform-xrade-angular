import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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


    countryData: any[] = [];


    isLogging: boolean = false;
    sponsorId: string = "xampy";
    dialCode: string;

    constructor(
        private formBuilder: FormBuilder,
        private memberRefrenceValidator: AsyncMemberReferenceValidator,
        private securityService: SecurityApiService,
        private authApiService: AuthApiService,
        private toastsService: AppToastService,
        private router: Router,
        private route: ActivatedRoute
    ) { 
        this.member = new MemberRegisterApiRequestInput();

        //Try to get the spônsor id from the url
        this.route.queryParams.subscribe(
            (params) => {
                console.log(params);
                this.sponsorId =  params["sponsorId"];
            }
        )
    }


    


    intiRegisterForm(){
        this.registerForm = this.formBuilder.group({
            referrer: [ this.sponsorId != null ? this.sponsorId : "xampy", 
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
            username: [null, 
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



    hasError(event){ console.log(event); } 
    getNumber(event){ console.log(event); } 
    telInputObject(event){ 
        console.log(event);

        setTimeout(() => {
            this.countryData = event.p;
        });
        
    }

    onCountryChange(event){ 
        console.log(event);
        this.dialCode = event.dialCode;
        this.registerForm.get("country").setValue(event.name, {
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
                    //Check if the referrer is valid
                    //if true there is a member with the given reference
                    if( data.status == "valid"){

                        //Validate email
                        this.securityService.verifyMemberEmail(this.registerForm.get("email").value)
                        .subscribe(
                            (data) => {
                                if(data.status == "invalid"){
                                    //There is no user with email address 

                                    //Check the username
                                    this.securityService.verifyMemberUsername(this.registerForm.get("username").value)
                                    .subscribe(
                                        (data) => {
                                            if(data.status == "invalid"){

                                                //There is no user with the given user name

                                                //Then check the phone number
                                                this.securityService.verifyMemberPhone(this.registerForm.get("telephone").value)
                                                .subscribe(
                                                    (data) => {
                                                        if(data.status == "invalid"){
                                                            //There is no user with the phone number address 

                                                            //Check password
                                                            if(this.registerForm.get("password").value != this.registerForm.get("confirm_password").value){
                                                                this.isLogging = false;
                                                                this.toastsService.show("Error", 
                                                                    "Please review your password confirmation...", 
                                                                    { classname: 'bg-danger text-white' });
                                                                this.router.navigate(['/auth', 'login'])
                                                            }else{
                                                                //Construct the request input
                                                                this.member.email = this.registerForm.get("email").value;
                                                                this.member.referenced = this.registerForm.get("referrer").value;
                                                                this.member.firstname = this.registerForm.get("username").value;
                                                                this.member.phone = "+" + this.dialCode + " " + this.registerForm.get("telephone").value;
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

                                                        }else if(data.status == "valid"){
                                                            //There is already a member with this phone
                                                            //prompt error
                                                            this.isLogging = false;
                                                            this.toastsService.show("Error", 
                                                                "Please the phone number you provided is alreasy used...", 
                                                                { classname: 'bg-danger text-white' });
                                                        }
                                                    },
                                                    //Validate phone error handler
                                                    (error) => {
                                                        this.isLogging = false;
                                                        this.toastsService.show("Error", error.error.message, { classname: 'bg-danger text-white' });
                                                    }
                                                );

                                            }else if(data.status == "valid"){
                                                //There is already a member with this username
                                                //prompt error
                                                this.isLogging = false;
                                                this.toastsService.show("Error", 
                                                    "Please the username you provided is alreasy used...", 
                                                    { classname: 'bg-danger text-white' });
                                            }
                                        },
                                        //Validate username error handler
                                        (error) => {
                                            this.isLogging = false;
                                            this.toastsService.show("Error", error.error.message, { classname: 'bg-danger text-white' });
                                        }
                                    );

                                }else if(data.status == "valid"){
                                    //There is already a member with this email
                                    //prompt error
                                    this.isLogging = false;
                                    this.toastsService.show("Error", 
                                        "Please the email address you provided is already used...", 
                                        { classname: 'bg-danger text-white' });
                                }
                            },
                            //Validatin email error handler
                            (error) => {
                                this.isLogging = false;
                                this.toastsService.show("Error", error.error.message, { classname: 'bg-danger text-white' });
                            }
                        )
                    
                    }else{
                        //There is no user with the given reference
                        this.isLogging = false;
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

        this.intiRegisterForm();
    }

    ngAfterViewInit(): void {
        

       
    }

}
