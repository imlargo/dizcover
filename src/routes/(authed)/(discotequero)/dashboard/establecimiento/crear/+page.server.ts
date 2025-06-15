import { TagsController } from '$lib/controllers/tags';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const tagsController = new TagsController();

	return {
		tags: await tagsController.getAvailableTags()
	};
}) satisfies PageServerLoad;
