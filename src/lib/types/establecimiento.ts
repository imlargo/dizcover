export type Coordinates = {
	lat: number;
	lng: number;
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