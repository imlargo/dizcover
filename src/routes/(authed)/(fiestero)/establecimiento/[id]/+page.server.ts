import type { PageServerLoad } from './$types';
import { DatabaseController } from '$lib/services/db';
import { CuponController } from '$lib/controllers/cupon';
import { ReviewsController } from '$lib/controllers/reviews';

export const load = (async ({ params, locals }) => {
	const dbController = new DatabaseController(locals.accessToken);

	const cuponController = new CuponController(locals.accessToken);
	const reviewController = new ReviewsController(locals.accessToken);

	const [establecimiento, eventos, imagenes, cordenadas, horarios, cupones, reviews] =
		await Promise.all([
			dbController.getEstablecimiento(params.id),
			dbController.getEventosEstablecimiento(params.id),
			dbController.getImagenesEstablecimiento(parseInt(params.id)),
			dbController.getCordenadasEstablecimiento(parseInt(params.id)),
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
