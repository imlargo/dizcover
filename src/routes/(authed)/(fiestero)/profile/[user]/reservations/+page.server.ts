import { CuponController } from '$lib/controllers/cupon';
import { DatabaseController } from '$lib/services/db';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const db = new DatabaseController(locals.accessToken);

	const cuponController = new CuponController(locals.accessToken);
	const cupones = await cuponController.getCuponesFiestero();

	return {
		cupones
	};
}) satisfies PageServerLoad;
