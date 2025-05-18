import type { PageServerLoad } from '../$types';

export const load = (async ({ params, locals }) => {
	return {
		id: params.id,
		accessToken: locals.accessToken
	};
}) satisfies PageServerLoad;
