import type { PageServerLoad } from './$types';
import { DatabaseController } from '$lib/services/db';

export const load = (async ({ params, locals }) => {
	const dbController = new DatabaseController(locals.accessToken);
	const establecimiento = await dbController.getEstablecimiento(params.id);
	const eventos = await dbController.getEventosEstablecimiento(params.id);
	const imagenes = await dbController.getImagenesEstablecimiento(establecimiento.id as number);
	const cordenadas = await dbController.getCordenadasEstablecimiento(establecimiento.id as number);
	const horarios = await dbController.getHorariosEstablecimiento(establecimiento.id as number);

	return {
		establecimiento: establecimiento,
		eventos: eventos,
		imagenes: imagenes,
		cordenadas: cordenadas,
		horarios: horarios
	};
}) satisfies PageServerLoad;
