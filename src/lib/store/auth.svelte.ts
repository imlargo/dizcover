import type { User } from '$lib/types/models/user';

class AuthStore {
	accessToken = $state('');
	refreshToken = $state('');
	user: User | null = $state(null);
	private user_storage_key = 'session_user';
	private access_token_storage_key = 'session_access_token';

	persistAuthData() {
		if (this.user) {
			localStorage.setItem(this.user_storage_key, JSON.stringify(this.user));
		} else {
			localStorage.removeItem(this.user_storage_key);
		}

		if (this.accessToken) {
			localStorage.setItem(this.access_token_storage_key, this.accessToken);
		} else {
			localStorage.removeItem(this.access_token_storage_key);
		}
	}

	loadFromStorage() {
		const userData = localStorage.getItem(this.user_storage_key);
		if (userData) {
			this.user = JSON.parse(userData) as User;
		}
		const tokenData = localStorage.getItem(this.access_token_storage_key);
		if (tokenData) {
			this.accessToken = tokenData;
		}
	}

	clearAuthToken() {
		this.accessToken = '';
		this.refreshToken = '';
	}

	isAuthenticated() {
		return this.accessToken !== '';
	}

	getAccessToken() {
		return this.accessToken;
	}

	setAccessToken(token: string) {
		this.accessToken = token;
	}

	setUser(user: User) {
		this.user = user;
	}

	deleteUser() {
		this.user = null;
	}

	getUser() {
		return this.user;
	}

	logout() {
		this.clearAuthToken();
		this.deleteUser();
	}
}

export const storeAuth = new AuthStore();
