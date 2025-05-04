import api from "$lib/services/api";
import type { Establecimiento } from "$lib/types/establecimiento";

export class EstablecimientoController {
    token?: string;

    constructor(token?: string) {
        this.token = token;
    }

    async getEstablecimiento(id: string | number): Promise<Establecimiento> {
        const response = await api.get(`/api/establecimiento/${id}`, {}, this.token);
        return response;
    }

    async getEstablecimientos(): Promise<Establecimiento[]> {
        const response = await api.get(`/api/establecimiento/`, {}, this.token);
        return response;
    }
}