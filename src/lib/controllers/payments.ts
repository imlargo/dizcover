import { dev } from '$app/environment';
import { PaymentMethodType } from '$lib/types/models/payments';
import type {
	CardTokenRequest,
	NequiTokenRequest,
	BancolombiaTokenRequest,
	WompiTokenResponse,
	CardTokenResponseData,
	NequiTokenResponseData,
	BancolombiaTokenResponseData
} from '$types/payments/tokenize';

export class PaymentController {
	token?: string;

	constructor(token?: string) {
		this.token = token;
	}

	async createPaymentMethod(type: PaymentMethodType) {}

	
}

export class WompiService {
	private publicKey: string;
	private baseUrl: string;

	constructor(publicKey: string) {
		this.publicKey = publicKey;
		this.baseUrl = dev ? 'https://sandbox.wompi.co/v1' : 'https://production.wompi.co/v1';
	}

	private headers(): Record<string, string> {
		return {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${this.publicKey}`
		};
	}

	async getAcceptanceTokens() {
		const response = await fetch(`${this.baseUrl}/merchants/${this.publicKey}`);
		const data: AcceptanceTokensResponse = await response.json();

		return data;
	}

	async tokenCard(req: CardTokenRequest): Promise<WompiTokenResponse<CardTokenResponseData>> {
		const res = await fetch(`${this.baseUrl}/tokens/cards`, {
			method: 'POST',
			headers: this.headers(),
			body: JSON.stringify(req)
		});
		return await res.json();
	}

	async tokenNequi(req: NequiTokenRequest): Promise<WompiTokenResponse<NequiTokenResponseData>> {
		const res = await fetch(`${this.baseUrl}/tokens/nequi`, {
			method: 'POST',
			headers: this.headers(),
			body: JSON.stringify(req)
		});
		return await res.json();
	}

	async tokenBancolombia(
		req: BancolombiaTokenRequest
	): Promise<WompiTokenResponse<BancolombiaTokenResponseData>> {
		const res = await fetch(`${this.baseUrl}/tokens/bancolombia_transfer`, {
			method: 'POST',
			headers: this.headers(),
			body: JSON.stringify(req)
		});
		return await res.json();
	}
}
