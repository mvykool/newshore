export interface Rate {
	base_currency_code: string;
	base_currency_name: string;
	rates: {
	[key: string]: {
		currency_name: string;
		rate: string;
		rate_for_amount: string;
	};
	};
	status: string;
}