import type { Establecimiento, CoordsEstablecimiento, Horario } from '$types/establecimiento';
import type { Evento, PricingEvento } from '$lib/types/evento';
import { $api } from './api';

export class DatabaseController {
	async getEstablecimiento(id: string | number): Promise<Establecimiento> {
		const response = await $api(`/api/establecimiento/${id}`)
		return response
	}

	async getEvento(id: string | number): Promise<Evento> {
		const response = await $api(`/api/evento/${id}`)
		return response
	}

	async getEstablecimientos(): Promise<Establecimiento[]> {
		const response = await $api(`/api/establecimiento/`)
		return response
	}

	async getEventos(): Promise<Evento[]> {
		const response = await $api(`/api/evento/`)
		return response
	}

	async getImagenesEstablecimiento(id: string | number): Promise<string[]> {
		const response = await $api(`/api/establecimiento/${id}/imagenes`)
		return response
	}

	async getImagenesEvento(id: string | number): Promise<string[]> {
		const response = await $api(`/api/evento/${id}/imagenes`)
		return response
	}

	async getCordenadasEstablecimiento(idEstablecimiento: string | number): Promise<CoordsEstablecimiento[]> {
		const response = await $api(`/api/establecimiento/${idEstablecimiento}/coordenadas/`)
		return response
	}

	async getPricingEvento(idEvento: string | number): Promise<PricingEvento[]> {
		const response = await $api(`/api/evento/asientos/${idEvento}/`)
		return response
	}

	async getEventosEstablecimiento(idEstablecimiento: string | number): Promise<Evento[]> {
		const response = await $api(`/api/evento/establecimiento/${idEstablecimiento}`)
		return response
	}

	async getHorariosEstablecimiento(idEstablecimiento: string | number): Promise<Horario[]> {
		const response = await $api(`/api/establecimiento/${idEstablecimiento}/horarios/`)
		return response
	}
}
