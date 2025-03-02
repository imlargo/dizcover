export type Coordinates = {
	lat: number | string;
	lng: number | string;
};

export type Establecimiento = {
	id?: string | number;
	nombre: string;
	calificacion_promedio: number;
	etiquetas: string[];
	descripcion: string;
	imagenes: string[];
	primera_imagen: string;
	ubicacion: Coordinates;
};

export type CoordsEstablecimiento = {
	id: number;
	latitud: number;
	longitud: number;
	hemisferio_lat: string;
	hemisferio_lon: string;
}