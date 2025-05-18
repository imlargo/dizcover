import { redirect, type Handle } from '@sveltejs/kit';
import { AuthCookies } from '$lib/server/auth-cookies';
import type { User } from '$lib/types/models/user';
import api from '$lib/services/api';

export const handle: Handle = async ({ event, resolve }) => {
	const isPublicAccessPath =
		event.url.pathname === '/login' ||
		event.url.pathname === '/authorize' ||
		event.url.pathname === '/logout' ||
		event.url.pathname === '/signup';
	if (isPublicAccessPath) {
		return await resolve(event);
	}

	const hasAuthCookies = AuthCookies.hasAuthCookies(event.cookies);
	if (!hasAuthCookies && event.url.pathname !== '/') {
		redirect(303, '/login');
	}

	if (event.url.pathname === '/' && !hasAuthCookies) {
		return await resolve(event);
	}

	const authTokens = AuthCookies.getAuthTokens(event.cookies);
	const user_id = AuthCookies.getIdCookie(event.cookies);
	event.locals.accessToken = authTokens?.accessToken;
	event.locals.refreshToken = authTokens?.refreshToken;

	try {
		const user = await api.get<User>(
			`/autenticacion/usuario/${user_id}`,
			{},
			authTokens?.accessToken
		);
		event.locals.user = user;

		const response = await resolve(event);
		return response;
	} catch (error) {
		AuthCookies.deleteAuthCookies(event.cookies);

		if (event.url.pathname === '/') {
			return await resolve(event);
		} else {
			redirect(303, '/login');
		}
	}
};
