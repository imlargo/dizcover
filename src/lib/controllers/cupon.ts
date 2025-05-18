import api from '$lib/services/api';
import type { Cupon, CuponesEstablecimientoResponse } from '$lib/types/models/cupon';
import { createFormData } from '$lib/utils/tools';

export class CuponController {
	token?: string;

	constructor(token?: string) {
		this.token = token;
	}

	async createCupon(id_establecimiento: number, cupon: any) {
		return await api.post(
			`/api/establecimiento/v1/cupones/${id_establecimiento}`,
			{
				body: createFormData(cupon)
			},
			{},
			this.token
		);
	}

	async getCuponesEstablecimiento(id_establecimiento: number) {
		return await api.get<CuponesEstablecimientoResponse>(
			`/api/establecimiento/v1/cupones/${id_establecimiento}`,
			{},
			this.token
		);
	}

	async getCupon(id_cupon: number) {
		return await api.get<Cupon>(`/api/establecimiento/v1/cupon/${id_cupon}`, {}, this.token);
	}

	async reclamarCupon(id_cupon: number) {
		return await api.post(
			`/api/establecimiento/v1/consumo_cupon/`,
			{
				cupon_id: id_cupon
			},
			{},
			this.token
		);
	}

	async validarCupon(codigo: string) {
		return await api.post(
			`/api/establecimiento/v1/consumo_cupon/validar/`,
			{
				codigo: codigo
			},
			{},
			this.token
		);
	}

	async getCuponesFiestero() {
		return await api.get<Cupon>(`/api/establecimiento/v1/consumo_cupon/`, {}, this.token);
	}
}
