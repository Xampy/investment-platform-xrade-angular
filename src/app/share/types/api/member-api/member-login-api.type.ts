

export interface MemberLoginApiRequestInput {
    email: string,
    password: string
}

export interface MemberLoginApiRequestOutputData {
    reference: null | string,
    lastname: string,
    firstname: string,
    password: string,
    grade: string,
    created_at: string,
    point: number,
    verified?: boolean,
    phone: string,
    referenced: string,
    id: number,
    email: string,
    account: {
        transaction_code: string | null,
        amount: number
    },
    interest_account: {
        amount: number
    },
    sponsorship_account: {
        amount: number
    }
    
}




export interface MemberLoginApiRequestOutput {
   data: MemberLoginApiRequestOutputData,
   token: string
    
}