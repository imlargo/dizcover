import api from "$lib/services/api";
import type { ReviewEstablecimiento } from "$lib/types/models/review";

export class ReviewsController {
    token?: string;
    constructor(token?: string) {
        this.token = token;
    }

    async getReviewsEstablecimiento(id_establecimiento: number) {
        return await api.get<ReviewEstablecimiento>(`/api/fiestero/${id_establecimiento}/feedback`,)
    }

    async createReviewEstablecimiento(id_fiestero: number, id_establecimiento: number, comentario: string, calificacion: number) {
        return await api.post<ReviewEstablecimiento>(`/api/fiestero/${id_establecimiento}/feedback/`, {
            fiestero: id_fiestero,
            comentario: comentario,
            calificacion: calificacion
        });
    }

    async deleteReviewEstablecimiento(id_review: number) {
        return await api.delete(`/api/fiestero/feedback/${id_review}/`);
    }
}