export type Cupon = {
    id: number;
    nombre_producto_descuento: string;
    porcentaje_descuento: string;
    descripcion: string;
    minimo_personas: number;
    dia: string;
    hora_limite_consumo: string;
    imagen: string;
    cantidad_total_cupones: number;
    es_express: boolean;
    pausado: boolean;
    establecimiento: number;
}

export interface CuponesEstablecimientoResponse {
    vigentes: Cupon[];
    pausados: Cupon[];
    caducados: Cupon[];
}