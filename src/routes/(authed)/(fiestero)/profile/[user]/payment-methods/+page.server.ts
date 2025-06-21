import { PaymentController } from '$lib/controllers/payments';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {

    const paymentControllers = new PaymentController(locals.accessToken);
    // const payments = await paymentControllers.getPaymentMethods(locals.accessToken);

    return {};
}) satisfies PageServerLoad;