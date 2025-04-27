import type { PageServerLoad } from './$types';
import { DatabaseController } from '$lib/services/db';

export const load = (async ({ params, locals }) => {
	const dbController = new DatabaseController(locals.accessToken);

	const [establecimiento, eventos, imagenes, cordenadas, horarios] = await Promise.all([
		dbController.getEstablecimiento(params.id),
		dbController.getEventosEstablecimiento(params.id),
		dbController.getImagenesEstablecimiento(parseInt(params.id)),
		dbController.getCordenadasEstablecimiento(parseInt(params.id)),
		dbController.getHorariosEstablecimiento(parseInt(params.id))
	]);

	return {
		establecimiento: establecimiento,
		eventos: eventos,
		imagenes: imagenes,
		cordenadas: cordenadas,
		horarios: horarios
	};
}) satisfies PageServerLoad;
