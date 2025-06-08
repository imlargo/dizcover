export type Cupon = {
	id: number;
	nombre_producto_descuento: string;
	porcentaje_descuento: string;
	precio_sin_descuento_producto: string;
	descripcion: string;
	minimo_personas: number;
	dia: string;
	imagen: string;
	cantidad_total_cupones: number;
	es_express: false;
	pausado: false;
	establecimiento: number;
	producto: number;
	codigo_consumo: string;
	consumo_cupon_id: number
}



export interface CuponesEstablecimientoResponse {
	vigentes: Cupon[];
	pausados: Cupon[];
	caducados: Cupon[];
}
