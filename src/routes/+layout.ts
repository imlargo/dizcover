import { browser } from '$app/environment';
import type { LayoutLoad } from './$types';
import type { User } from '$lib/types/models/user';
import { storeAuth } from '$lib/store/auth.svelte';

export const load = (async ({ data }) => {
	const user: User | undefined = data?.user;
	const accessToken: string | any = data?.accessToken;

	if (browser) {
		if (user === undefined || accessToken === undefined) {
			storeAuth.logout();
		} else {
			storeAuth.setUser(user);
			storeAuth.setAccessToken(accessToken);
		}
	}

	return {
		...data
	};
}) satisfies LayoutLoad;
