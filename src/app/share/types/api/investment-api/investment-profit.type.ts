



export interface InvestmentProfitWidrawalRequestInputData {
    payment: string
	metadata: string,
	amount: number,
}

export interface InvestmentProfitWidrawalRequestOutputData{
    payment: string
	id: number,
	amount: number,
    filled: boolean
}