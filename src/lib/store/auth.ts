import type { Token } from '$lib/types/auth';

class AuthStore {
	private authToken: Token = {
		token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM5NzE2MjA5LCJpYXQiOjE3Mzk3MTI2MDksImp0aSI6IjU0MTJjODMzYjU0OTRiMTk5YjA3ZDljNTQ1ZjA1N2FkIiwidXNlcl9pZCI6MX0.KUcY_5UOZ2ZAEGrCub43FcKA7EDshxrQphdcIQncSmE',
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