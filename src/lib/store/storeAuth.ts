import type { Token } from '$lib/types/auth';

class AuthStore {
	private authToken: Token = {
		token: '',
		refreshToken: ''
	};

	clearAuthToken() {
		this.authToken = {
			token: '',
			refreshToken: ''
		};
	}

	isAuthenticated() {
		return this.authToken.token !== '';
	}

	getAccessToken() {
		return this.authToken.token;
	}

	getRefreshToken() {
		return this.authToken.refreshToken;
	}

	setAccessToken(token: string) {
		this.authToken.token = token;
	}

	setRefreshToken(token: string) {
		this.authToken.refreshToken = token;
	}

	refresh() {}
}

export const storeAuth = new AuthStore();