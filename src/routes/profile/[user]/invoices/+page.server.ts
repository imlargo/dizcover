import { DatabaseController } from '$lib/services/db';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const dbController = new DatabaseController();
	const establecimientos = await dbController.getEstablecimientos();
	return { establecimientos };
}) satisfies PageServerLoad;
