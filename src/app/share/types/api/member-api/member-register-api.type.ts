

export interface MemberRegisterApiRequestInputInterface {
    lastname: string,
    firstname: string,
    email: string,
    phone: string,
    reference: string,
    referenced: string,
    password: string
    country: string
}

export interface MemberRegisterApiRequestOutputInterface {
    data: {
        reference: null | string,
        lastname: string,
        firstname: string,
        password: string,
        phone: string,
        referenced: string,
        id: number,
        email: string,
        account: {
            transaction_code: string | null,
            amount: number
        }
    },
    verification_token: string
}