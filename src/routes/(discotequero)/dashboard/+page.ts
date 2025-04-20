import { DatabaseController } from '$lib/services/db';
import type { PageLoad } from './$types';

export const load = (async ({ data }) => {
    const db = new DatabaseController(data.accessToken);

    const establecimientos = await db.getEstablecimientos();

    return {
        establecimientos
    };
}) satisfies PageLoad;