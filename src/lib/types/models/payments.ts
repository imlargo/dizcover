export enum PaymentMethodType {
	Nequi = 'NEQUI',
	Bancolombia = 'BANCOLOMBIA_TRANSFER',
	Card = 'CARD'
}

export type PaymentMethod = {
	id: number;
	wompi_source_id: string;
	tipo: PaymentMethodType;
	estado: string;
	email: string;
	ultimos_digitos_tarjeta: string | null;
	titular_tarjeta: string | null;
	vencimiento_mes: string | null;
	vencimiento_anio: string | null;
	bin_tarjeta: string | null;
	fecha_validez_final: string | null;
	celular_nequi: string | null;
	descripcion_pago_bancolombia: string | null;
	fecha_creacion: string;
	fiestero: number;
};

export function getPaymentMethodTypeLabel(type: PaymentMethodType): string {
	switch (type) {
		case PaymentMethodType.Nequi:
			return 'Nequi';
		case PaymentMethodType.Bancolombia:
			return 'Bancolombia';
		case PaymentMethodType.Card:
			return 'Tarjeta de Crédito/Débito';
		default:
			return 'Unknown';
	}
}
