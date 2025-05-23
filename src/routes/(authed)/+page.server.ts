import { DatabaseController } from '$lib/services/db';
import type { PageServerLoad } from '../$types';

export const load = (async ({ locals }) => {
	const dbController = new DatabaseController(locals.accessToken);

	const [establecimientos, eventos] = await Promise.all([
		dbController.getEstablecimientos(),
		dbController.getEventos()
	]);

	return { establecimientos, eventos };
}) satisfies PageServerLoad;
