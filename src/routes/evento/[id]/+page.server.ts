import type { PageServerLoad } from './$types';
import { DatabaseController } from '$lib/services/db';

export const load = (async ({ params, locals }) => {
	const dbController = new DatabaseController(locals.accessToken);
	const evento = await dbController.getEvento(params.id);
	const imagenes = await dbController.getImagenesEvento(params.id);
	const seatsPricing = await dbController.getPricingEvento(params.id);

	return { evento, imagenes, seatsPricing };
}) satisfies PageServerLoad;
