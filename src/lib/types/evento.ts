export type Coordinates = {
	lat: number;
	lng: number;
};

export type Evento = {
	id?: string | number;
	nombre: string;
	fecha: string;
	lugar: string;
	imagen: string;
	hora: {
		inicio: string;
		fin: string;
	};
	ubicacion: Coordinates;
};
