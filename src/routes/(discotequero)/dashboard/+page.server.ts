import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	return {
		accessToken: locals.accessToken
	};
}) satisfies PageServerLoad;
