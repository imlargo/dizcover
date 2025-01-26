<script lang="ts">
    import { Badge } from "$lib/components/ui/badge/index";
    import type { Evento } from "$lib/types/evento";

    type Props = {
        evento: Evento
    }

    const { evento }: Props = $props()
</script>


<div>
    <a href="/" class="w-[315px] h-[466px] rounded-md overflow-hidden">
        <img src="https://s3-alpha-sig.figma.com/img/bbb3/befc/bd3812f6dfd19214d49a0ab8935ffd5f?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=g5Jx6jHcwCPeQCmmRJpTCzmTid6jsC3jlw0lzJODAxYNB0kkbDVoN8zIOqSBpaCKOooqVomeJEUZFwo-RIKdG4Da8lSJ7Q9-0UuQ1xx5Hf0ZcZjm3Airt6sAyAzLj5C3E9S2gcGb37UuDxnkts88CY2g1rUVJ7INz~YuSnuMS~skC6QQMzQK4DVOT4T4nAw7vGitK43ZP11BCsIP6GrL5HEYqRMr6FohO4eh9HZ8Rb6TjKhqCuw-xQMsvCaUPezA0PkpkKvxiHrJ1XSde162kXagJKfeUbEl5NAQKdC2QKI03FDDUDuiENANFfayCEe30GCupU2vup5jawO8BOWVUw__" alt="" class="w-full h-full rounded-md object-cover">
    </a>

    <div class="text-center">
        <h5 class="text-xl font-bold mt-4">{evento.nombre}</h5>
        <span class="block">{evento.fecha}</span>
        <span class="block">{evento.lugar}</span>
        <span class="block">{evento.hora.inicio} - {evento.hora.fin}</span>
    </div>
</div>