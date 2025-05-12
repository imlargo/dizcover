import { CuponController } from '$lib/controllers/cupon';
import { EstablecimientoController } from '$lib/controllers/establecimiento';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, locals}) => {
    const cuponController = new CuponController(locals.accessToken);
    const establecimientoController = new EstablecimientoController(locals.accessToken);

    const cupon = await cuponController.getCupon(params.id);
    const establecimiento = await establecimientoController.getEstablecimiento(cupon.establecimiento);

    return {
        cupon,
        establecimiento,
    };
}) satisfies PageServerLoad;