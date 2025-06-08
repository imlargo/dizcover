import type { PageServerLoad } from './$types';
import { DatabaseController } from '$lib/services/db';
import { CuponController } from '$lib/controllers/cupon';
import { ReviewsController } from '$lib/controllers/reviews';
import type { CoordsEstablecimiento } from '$lib/types/establecimiento';

export const load = (async ({ params, locals }) => {
	const dbController = new DatabaseController(locals.accessToken);

	const cuponController = new CuponController(locals.accessToken);
	const reviewController = new ReviewsController(locals.accessToken);

	let cordenadas: CoordsEstablecimiento[] = [];
	try {
		cordenadas = await dbController.getCordenadasEstablecimiento(parseInt(params.id));
	} catch (error) {}

	const [establecimiento, eventos, imagenes, horarios, cupones, reviews] = await Promise.all([
		dbController.getEstablecimiento(params.id),
		dbController.getEventosEstablecimiento(params.id),
		dbController.getImagenesEstablecimiento(parseInt(params.id)),
		dbController.getHorariosEstablecimiento(parseInt(params.id)),
		cuponController.getCuponesEstablecimiento(parseInt(params.id)),
		reviewController.getReviewsEstablecimiento(parseInt(params.id))
	]);

	return {
		establecimiento: establecimiento,
		eventos: eventos,
		imagenes: imagenes,
		cordenadas: cordenadas,
		horarios: horarios,
		cupones: cupones,
		reviews: reviews
	};
}) satisfies PageServerLoad;
