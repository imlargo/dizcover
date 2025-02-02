export type Coordinates = {
	lat: number;
	lng: number;
};

export type Establecimiento = {
	id?: string | number;
	nombre: string;
	score: number;
	tags: string[];
	description: string;
	imagenes: string[];
	imagen: string;
	ubicacion: Coordinates;
};
