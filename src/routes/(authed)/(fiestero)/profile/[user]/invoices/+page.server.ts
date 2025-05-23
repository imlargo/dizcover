import { DatabaseController } from '$lib/services/db';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const dbController = new DatabaseController(locals.accessToken);
	const establecimientos = await dbController.getEstablecimientos();
	return { establecimientos };
}) satisfies PageServerLoad;
