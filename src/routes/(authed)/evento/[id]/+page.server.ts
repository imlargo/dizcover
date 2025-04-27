import type { PageServerLoad } from './$types';
import { DatabaseController } from '$lib/services/db';

export const load = (async ({ params, locals }) => {
	const dbController = new DatabaseController(locals.accessToken);
	
	const [evento, imagenes, seatsPricing, artistas ] = await Promise.all([
		dbController.getEvento(params.id),
		dbController.getImagenesEvento(params.id),
		dbController.getPricingEvento(params.id),
		dbController.getArtistasEvento(params.id)
	])

	return { evento, imagenes, seatsPricing, artistas };
}) satisfies PageServerLoad;
