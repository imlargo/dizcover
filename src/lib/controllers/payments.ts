import { dev } from '$app/environment';
import api from '$lib/services/api';
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

	async createPaymentMethod(type: PaymentMethodType, token: string, email: string, acceptance_token: string, accept_personal_auth: string) {
		const payload = {
			type: type,
			token: token,
			payment_description: "",
			customer_email: email,
			acceptance_token: acceptance_token,
			accept_personal_auth: accept_personal_auth,
		}

		return await api.post("/api/fiestero/v1/metodos-pago/crear", payload)
	}
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

	async validateBancolombiaToken(
		token: string
	): Promise<WompiTokenResponse<BancolombiaTokenResponseData>> {
		const res = await fetch(`${this.baseUrl}/tokens/bancolombia_transfer/${token}`, {
			method: 'GET',
			headers: this.headers()
		});
		return await res.json();
	}
}
