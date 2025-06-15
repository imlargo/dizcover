export interface CardTokenRequest {
	number: string;
	cvc: string;
	exp_month: string;
	exp_year: string;
	card_holder: string;
}

export interface NequiTokenRequest {
	phone_number: string;
}

export type BancolombiaAuthType = 'TOKEN' | 'TRANSACTION';

export interface BancolombiaTokenRequest {
	redirect_url: string;
	type_auth?: BancolombiaAuthType;
}

export interface WompiTokenResponse<Data = any> {
	data: Data;
	status: string;
	[key: string]: any;
}

export interface CardTokenResponseData {
	id: string;
	status: 'CREATED';
	brand: string;
	last_four: string;
	[key: string]: any;
}

export interface NequiTokenResponseData {
	id: string;
	status: 'PENDING' | 'APPROVED';
	phone_number: string;
	[key: string]: any;
}

export interface BancolombiaTokenResponseData {
	id: string;
	status: 'PENDING' | 'AVAILABLE';
	redirect_url?: string;
	authorization_url?: string;
	[key: string]: any;
}
