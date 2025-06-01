type Fiestero = {
	id: number;
	identidad_sexo: string;
	num_identificacion: string;
	pasaporte: string;
	user: number;
};

export type User = {
	id: number;
	nombre_usuario: string;
	email: string;
	nombre_completo: string;
	foto_perfil: string;
	tipo: string;
	fiestero: Fiestero | null;
	discotequero: Fiestero | null;
};
