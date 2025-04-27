import type { Establecimiento, CoordsEstablecimiento, Horario } from '$types/establecimiento';
import type { Evento, PricingEvento } from '$lib/types/evento';
import api from './api';
export class DatabaseController {
	token?: string;
	constructor(token?: string) {
		this.token = token;
	}

	async getEstablecimiento(id: string | number): Promise<Establecimiento> {
		const response = await api.get(`/api/establecimiento/${id}`, {}, this.token);
		return response;
	}

	async getEvento(id: string | number): Promise<Evento> {
		const response = await api.get(`/api/evento/${id}`, {}, this.token);
		return response;
	}

	async getEstablecimientos(): Promise<Establecimiento[]> {
		const response = await api.get(`/api/establecimiento/`, {}, this.token);
		return response;
	}

	async getEventos(): Promise<Evento[]> {
		const response = await api.get(`/api/evento/`, {}, this.token);
		return response;
	}

	async getImagenesEstablecimiento(id: string | number): Promise<string[]> {
		const response = await api.get(`/api/establecimiento/${id}/imagenes`, {}, this.token);
		return response;
	}

	async getImagenesEvento(id: string | number): Promise<string[]> {
		const response = await api.get(`/api/evento/${id}/imagenes`, {}, this.token);
		return response;
	}

	async getCordenadasEstablecimiento(
		idEstablecimiento: string | number
	): Promise<CoordsEstablecimiento[]> {
		const response = await api.get(
			`/api/establecimiento/${idEstablecimiento}/coordenadas/`,
			{},
			this.token
		);
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

	async getHorariosEstablecimiento(idEstablecimiento: string | number): Promise<Horario[]> {
		const response = await api.get(
			`/api/establecimiento/${idEstablecimiento}/horarios/`,
			{},
			this.token
		);
		return response;
	}

	async getArtistasEvento(idEvento: string | number): Promise<any[]> {
		const response = await api.get(
			`/api/evento/artistas/${idEvento}`,
			{},
			this.token
		);
		return response;
	}
}
