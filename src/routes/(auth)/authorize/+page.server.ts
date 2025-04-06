import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import type { SignInResponse } from '$lib/types/auth';
import { AuthCookies } from '$lib/server/auth-cookies';

export const load = (async ({ url, cookies }) => {
	try {
		const credentialsText = url.searchParams.toString();
		const decoded = new URLSearchParams(credentialsText);
		const credentials = Object.fromEntries(decoded) as SignInResponse;

		AuthCookies.setAuthCookies(cookies, credentials.access_token, '');
		redirect(303, '/');
	} catch (error) {
		redirect(303, '/logout');
	}
}) satisfies PageServerLoad;