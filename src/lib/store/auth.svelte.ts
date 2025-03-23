import type { User } from '$lib/types/models/user';

class AuthStore {
	accessToken = $state(
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQyMTQ0NTQ3LCJpYXQiOjE3NDIxNDA5NDcsImp0aSI6ImZmYTUwMDBhODZmMjRiNzZiM2QzNzk4NGIwMzYwYzE4IiwidXNlcl9pZCI6MjF9.6bjnqdS5_BGz-bn-M2i7Z27J0JFDcOJaAs1lXGcqlvw'
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
