export type ReviewEstablecimiento = {
	id: number;
	establecimiento: number;
	comentario: string;
	calificacion: number;
	fecha: string;
	fiestero: {
		id: 11,
		user: {
			nombre_completo: string;
			foto_perfil: string;
		},
		identidad_sexo: string;
		num_identificacion: string;
		pasaporte: string;
	},
};

