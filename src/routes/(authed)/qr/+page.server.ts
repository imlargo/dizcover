import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	return {
		token: locals.accessToken
	};
}) satisfies PageServerLoad;
