import api from "$lib/services/api";
import type { Tag } from "$lib/types/models/tag";

export class TagsController {
    token?: string;

    constructor(token?: string) {
        this.token = token;
    }

    async getAvailableTags() {
        return await api.get<Tag[]>("/api/recomendacion/etiquetas", {}, this.token);
    }
}
