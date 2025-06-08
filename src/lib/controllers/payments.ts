import type { Evento, PricingEvento } from '$lib/types/evento';
import { PaymentMethodType } from '$lib/types/models/payments';

export class PaymentController {
    token?: string;

    constructor(token?: string) {
        this.token = token;
    }

    private async _createPaymentMethod(type: PaymentMethodType) {

    }
}
