import type { LayoutServerLoad } from './$types';

export const load = (async ({ params, locals }) => {
	return {
		userId: params.user,
		userData: locals.user,
	};
}) satisfies LayoutServerLoad;
