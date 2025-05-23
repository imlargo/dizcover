import { DatabaseController } from '$lib/services/db';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, locals }) => {
	const db = new DatabaseController(locals.accessToken);
	const establecimiento = await db.getEstablecimiento(params.id);

	return {
		establecimiento
	};
}) satisfies PageServerLoad;
