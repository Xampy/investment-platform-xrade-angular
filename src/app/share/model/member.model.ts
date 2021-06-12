import { MemberRegisterApiRequestInputInterface } from "../types/api/member-api/member-register-api.type";


export class MemberRegisterApiRequestInput implements MemberRegisterApiRequestInputInterface {

    lastname: string;
    firstname: string;
    email: string;
    phone: string;
    reference: string;
    referenced: string;
    password: string;
    country: string;

    confirm_password: string = "";

    /**
     * Initialisze the request data with 
     * empty string
     */
    constructor(){
        this.lastname = "";
        this.firstname = "";
        this.email = "";
        this.phone = "";
        this.reference = "#";
        this.referenced = "";
        this.password = "";
        this.country = "";
    }
   
}