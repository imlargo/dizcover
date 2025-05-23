import api from '$lib/services/api';
import type { Evento, PricingEvento } from '$lib/types/evento';

export class EventoController {
	token?: string;

	constructor(token?: string) {
		this.token = token;
	}

	async getEvento(id: string | number): Promise<Evento> {
		const response = await api.get(`/api/evento/${id}`, {}, this.token);
		return response;
	}

	async getEventos(): Promise<Evento[]> {
		const response = await api.get(`/api/evento/`, {}, this.token);
		return response;
	}

	async getImagenesEvento(id: string | number): Promise<string[]> {
		const response = await api.get(`/api/evento/${id}/imagenes`, {}, this.token);
		return response;
	}

	async getPricingEvento(idEvento: string | number): Promise<PricingEvento[]> {
		const response = await api.get(`/api/evento/asientos/${idEvento}/`, {}, this.token);
		return response;
	}

	async getEventosEstablecimiento(idEstablecimiento: string | number): Promise<Evento[]> {
		const response = await api.get(
			`/api/evento/establecimiento/${idEstablecimiento}`,
			{},
			this.token
		);
		return response;
	}
}
