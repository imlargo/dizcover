import { redirect, type Handle } from '@sveltejs/kit';
import { AuthCookies } from '$lib/server/auth-cookies';
import type { User } from '$lib/types/models/user';
import api from '$lib/services/api';

export const handle: Handle = async ({ event, resolve }) => {
	const isPublicAccessPath =
		event.url.pathname === '/login' ||
		event.url.pathname === '/authorize' ||
		event.url.pathname === '/logout' ||
		event.url.pathname === '/signup' ||
		event.url.pathname === '/';
	if (isPublicAccessPath) {
		return await resolve(event);
	}

	const hasAuthCookies = AuthCookies.hasAuthCookies(event.cookies);
	if (!hasAuthCookies) {
		redirect(303, '/login');
	}

	const authTokens = AuthCookies.getAuthTokens(event.cookies);
	event.locals.accessToken = authTokens?.accessToken;
	event.locals.refreshToken = authTokens?.refreshToken;

	const user = await api.get<User>('/auth/me', {}, authTokens?.accessToken);
	event.locals.user = user;

	const response = await resolve(event);
	return response;
};
