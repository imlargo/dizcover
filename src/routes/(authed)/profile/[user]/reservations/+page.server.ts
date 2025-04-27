import { DatabaseController } from '$lib/services/db';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const db = new DatabaseController(locals.accessToken);
	const establecimiento = await db.getEstablecimiento(2);

	return {
		establecimiento
	};
}) satisfies PageServerLoad;
