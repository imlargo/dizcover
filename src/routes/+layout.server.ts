import type { User } from '$lib/types/models/user';
import type { LayoutServerLoad } from './$types';
import { AuthCookies } from '$lib/server/auth-cookies';

export const load = (async ({ locals, cookies }) => {
	const user: User | undefined = locals?.user;
	const { accessToken } = AuthCookies.getAuthTokens(cookies);
	console.log('Loading layout server data', user);
	
	return { user, accessToken };
}) satisfies LayoutServerLoad;
