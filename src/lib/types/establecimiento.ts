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
	menu_pdf_url: string | null;
	direccion: string;
	telefono: string;
	email: string;
	departamento: string;
	municipio: string;
	menu_pdf: string | null;
	id_discotequero: number;
};

export type CoordsEstablecimiento = {
	id: number;
	latitud: number;
	longitud: number;
	hemisferio_lat: string;
	hemisferio_lon: string;
};

export type Horario = {
	dia_id: number;
	dia: string;
	hora_apertura: string;
	hora_cierre: string;
};
