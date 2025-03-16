import type { User } from '$lib/types/models/user';

class AuthStore {
	accessToken = $state(
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQyMTM1OTAyLCJpYXQiOjE3NDIxMzIzMDIsImp0aSI6Ijk3YzhiMTNkNmM2YTQwYjQ5Zjg4MmEzNThlYjRiOWNhIiwidXNlcl9pZCI6MjF9.-Ew0oGThW9X-dPust93ciqewghYEDqVUFDrc5u9jruI'
	);
	refreshToken = $state('');
	user: User | null = $state(null);

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
