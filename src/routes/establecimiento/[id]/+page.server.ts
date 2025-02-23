import type { PageServerLoad } from './$types';
import { DatabaseController } from '$lib/services/db';

export const load = (async ({ params }) => {
	const dbController = new DatabaseController();
	const establecimiento = await dbController.getEstablecimiento(params.id);
	const eventos = await dbController.getEventos();

	return {
		establecimiento: establecimiento,
		eventos: eventos
	};
}) satisfies PageServerLoad;
