import { DatabaseController } from '$lib/services/db';
import type { PageLoad } from '../$types';

export const load = (async ({ data }) => {
	const db = new DatabaseController(data.accessToken);
	const establecimiento = await db.getEstablecimiento(data.id);

	return {
		establecimiento
	};
}) satisfies PageLoad;
