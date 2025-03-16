import type { User } from '$lib/types/models/user';

class AuthStore {
	accessToken = $state('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQyMTM1NDU4LCJpYXQiOjE3NDIxMzE4NTgsImp0aSI6ImQxOTM5NjBlMGY0NTQ5YTU5MGIwODg1MmJkODRmM2JkIiwidXNlcl9pZCI6MjF9.RtSrpFjHWTNGUmCdEbQ74hXZKrisDFu86I9bYBfVd1w');
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
