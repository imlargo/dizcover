import { DiscotequeroController } from '$lib/controllers/discotequero';
import { TagsController } from '$lib/controllers/tags';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const tagsController = new TagsController();
	const discotequerosController = new DiscotequeroController(locals.accessToken);

	return {
		tags: await tagsController.getAvailableTags(),
		discotequeros: await discotequerosController.getDiscotequeros(),
	};
}) satisfies PageServerLoad;
