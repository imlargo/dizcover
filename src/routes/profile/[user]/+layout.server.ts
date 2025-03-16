import type { LayoutServerLoad } from './$types';

export const load = (async ({ params }) => {
    return {
        userId: params.user,
    };
}) satisfies LayoutServerLoad;