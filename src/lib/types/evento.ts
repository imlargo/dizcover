export type Coordinates = {
	lat: number;
	lng: number;
};

export type Evento = {
	id?: string | number;
	nombre: string;
	fecha: string;
	lugar: string;
	descripcion: string;
	primera_imagen: string;
	hora: {
		inicio: string;
		fin: string;
	};
	ubicacion: Coordinates;
};
