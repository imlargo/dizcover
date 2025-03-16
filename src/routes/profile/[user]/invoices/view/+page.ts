import type { PageLoad } from './$types';
import type { Invoice } from '$lib/types/profile/invoice';
import { DatabaseController } from '$lib/services/db';
export const load = (async () => {
	const dbController = new DatabaseController();
	const establecimiento = (await dbController.getEstablecimientos())[0];

	const invoice: Invoice = {
		image: establecimiento.primera_imagen,
		name: establecimiento.nombre,
		type: Math.random() > 0.5 ? 'Cover' : 'Cupon de consumo',
		quantity: Math.floor(Math.random() * 10) + 1,
		total: Math.floor(Math.random() * 70000) + 20000,
		payment_method: ['Efectivo', 'Tarjeta', 'Transferencia'][Math.floor(Math.random() * 3)] as
			| 'Efectivo'
			| 'Tarjeta'
			| 'Transferencia',
		date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString().split('T')[0]
	};

	return { invoice, establecimiento };
}) satisfies PageLoad;
