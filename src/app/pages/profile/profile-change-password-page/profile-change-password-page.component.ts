import { Component, OnInit } from '@angular/core';
import { AccountDataManagerService } from 'src/app/services/account/account-data-manager.service';
import { SecurityApiService } from 'src/app/services/api/xrade/security/security-api.service';
import { AppToastService } from 'src/app/services/component/app-toast.service';

@Component({
    selector: 'app-profile-change-password-page',
    templateUrl: './profile-change-password-page.component.html',
    styleUrls: ['./profile-change-password-page.component.css']
})
export class ProfileChangePasswordPageComponent implements OnInit {

    wantInputPassword: boolean = false;
    wantInputNewPassword: boolean = false;
    username: string ="";
    email: string = "";
    isUpdating: boolean = false;

    constructor(
        private memberDataManager: AccountDataManagerService,
        private toastsService: AppToastService,
        private securityApiService: SecurityApiService
    ) { }

    ngOnInit(): void {
        this.memberDataManager.getMemberSubject()
            .subscribe(
                (user) => {
                    if (user != null) {
                        this.username = user.firstname;
                        this.email = user.email; 
                }
                }
            )
    }


    editPassword(){
        this.wantInputPassword = true;
    }

    editNewPassword(){
        if(this.wantInputPassword){
            this.wantInputNewPassword = true;
        }
    }

    cancelEdit(){
        this.wantInputNewPassword = this.wantInputPassword = false;
    }

    updatePassword(){

        if(this.wantInputPassword == this.wantInputNewPassword && this.wantInputPassword == true){
            const oldPassword: string = (document.getElementById("old-password") as any).value;
            const newPassword: string = (document.getElementById("new-password") as any).value;
            const newPasswordConfirm: string = (document.getElementById("new-password-confirm") as any).value;

            if(newPassword != newPasswordConfirm){
                
                this.toastsService.show(
                    "Error", "Please confirm your new password", { classname: 'bg-danger text-white' });        
            }else {
                if(newPassword.length > 0 || oldPassword.length > 0){

                    this.isUpdating = true;
                    this.securityApiService.updatePassword(
                        {old_password: oldPassword, new_password: newPassword}
                    ).subscribe(
                        () => {
                            this.isUpdating = false;
                            this.cancelEdit();
                            this.toastsService.show(
                                "Success", "Password updated successfully", { classname: 'bg-success text-white' });    
                        },
                        (error) => {
                            this.isUpdating = false;
                            this.toastsService.show("Error", error.error.message, { classname: 'bg-danger text-white' });
                        }
                    )
                }else{
                    this.toastsService.show(
                        "Error", "Empty passwor is not allowed", { classname: 'bg-danger text-white' });    
                }
            }
        }else{
            this.toastsService.show(
                "Error", "Please provide new values for your password", { classname: 'bg-danger text-white' });
        }
    }



}
