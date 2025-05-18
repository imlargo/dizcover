import { DatabaseController } from '$lib/services/db';
import type { PageLoad } from './$types';

export const load = (async ({ data }) => {
	const db = new DatabaseController(data.accessToken);

	const [establecimientos, eventos] = await Promise.all([
		db.getEstablecimientos(),
		db.getEventos()
	]);

	return {
		establecimientos: establecimientos.slice(0, 6),
		eventos: eventos.slice(0, 6),
	};
}) satisfies PageLoad;
