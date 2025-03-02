import type { PageServerLoad } from './$types';
import { DatabaseController } from '$lib/services/db';

export const load = (async ({ params }) => {
	const dbController = new DatabaseController();
	const evento = await dbController.getEvento(params.id);
	const imagenes = await dbController.getImagenesEvento(params.id);
	const seatsPricing = await dbController.getPricingEvento(params.id);

	return { evento, imagenes, seatsPricing };
}) satisfies PageServerLoad;
