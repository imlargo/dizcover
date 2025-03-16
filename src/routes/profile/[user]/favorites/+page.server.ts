import { DatabaseController } from '$lib/services/db';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const dbController = new DatabaseController();

	const [establecimientos, eventos] = await Promise.all([
		dbController.getEstablecimientos(),
		dbController.getEventos()
	]);

	return { establecimientos, eventos };
}) satisfies PageServerLoad;
