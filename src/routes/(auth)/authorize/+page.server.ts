import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import type { SignInResponse } from '$lib/types/auth';
import { AuthCookies } from '$lib/server/auth-cookies';

export const load = (async ({ url, cookies }) => {
	const credentialsText = url.searchParams.toString();
	const decoded = new URLSearchParams(credentialsText);
	const credentials = Object.fromEntries(decoded) as SignInResponse;

	AuthCookies.setAuthCookies(cookies, credentials.access_token, '');
	AuthCookies.setIdCookie(cookies, credentials.user_id);
	return redirect(303, '/');
}) satisfies PageServerLoad;
