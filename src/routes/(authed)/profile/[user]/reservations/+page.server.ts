import { CuponController } from '$lib/controllers/cupon';
import { DatabaseController } from '$lib/services/db';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const db = new DatabaseController(locals.accessToken);
	const establecimiento = await db.getEstablecimiento(2);

	const cuponController = new CuponController(locals.accessToken);
	const cupones = await cuponController.getCuponesFiestero()

	return {
		establecimiento,
		cupones,
	};
}) satisfies PageServerLoad;
