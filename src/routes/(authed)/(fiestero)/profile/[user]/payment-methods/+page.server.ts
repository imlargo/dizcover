import { PaymentController } from '$lib/controllers/payments';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {

    const paymentControllers = new PaymentController(locals.accessToken);
    const userPaymentMethods = await paymentControllers.getPaymentMethods(locals.accessToken);

    return {
        userPaymentMethods: userPaymentMethods
    };
}) satisfies PageServerLoad;