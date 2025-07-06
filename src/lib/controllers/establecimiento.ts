import api from '$lib/services/api';
import type { Establecimiento } from '$lib/types/establecimiento';

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

	async createEstablecimiento(establecimiento: Partial<Establecimiento>) {
		const response = await api.post<Establecimiento>(
			`/api/establecimiento/`,
			establecimiento,
			{},
			this.token
		);
		return response;
	}

	async deleteEstablecimiento(id: number) {
		return await api.delete(`/api/establecimiento/${id}/`, {}, {}, this.token);
	}

	async createImagenesEstablecimiento(establecimientoID: number, imagenes: File[]) {
		const formData = new FormData();
		imagenes.forEach((imagen, i) => {
			const index = (i + 1).toString();
			formData.append('imagen' + index, imagen);
		});
		const response = await api.post(
			`/api/establecimiento/${establecimientoID}/imagenes/`,
			formData,
			{},
			this.token
		);
		return response;
	}

	async createCoordinatesEstablecimiento(establecimientoID: number, lat: number, lon: number) {
		const response = await api.post(
			`/api/establecimiento/${establecimientoID}/coordenadas/`,
			{
				latitud: lat,
				longitud: lon,
				hemisferio_lat: 'N',
				hemisferio_lon: 'E'
			},
			{},
			this.token
		);
		return response;
	}

	async createHorarioEstablecimiento(
		establecimientoID: number,
		horarios: Record<string, { hora_apertura: string; hora_cierre: string }>
	) {
		const response = await api.post(
			`/api/establecimiento/${establecimientoID}/horarios/`,
			horarios,
			{},
			this.token
		);
		return response;
	}

	async createEtiquetasEstablecimiento(establecimientoID: number, etiquetas: number[]) {
		const response = await api.post(
			`/api/recomendacion/etiquetas/establecimiento/${establecimientoID}/`,
			{ etiquetas },
			{},
			this.token
		);
		return response;
	}
}
