import type { PageServerLoad } from './$types';
import { DatabaseController } from '$lib/services/db';

export const load = (async ({ params }) => {
	const dbController = new DatabaseController();
	const evento = await dbController.getEvento(params.id);

	return { evento };
}) satisfies PageServerLoad;
