import api from '$lib/services/api';
import type { Discotequero } from '$lib/types/models/discotequero';

export class DiscotequeroController {
    token?: string;

    constructor(token?: string) {
        this.token = token;
    }

    async getDiscotequeros() {
        const response = await api.get<Discotequero[]>(`/api/discotequero/`, {}, this.token);
        return response;
    }
}