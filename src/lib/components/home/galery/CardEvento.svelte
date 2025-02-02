<script lang="ts">
	import { Badge } from '$components/ui/badge/index';
	import type { Evento } from '$lib/types/evento';

	type Props = {
		evento: Evento;
	};

	const { evento }: Props = $props();
</script>

<div>
	<a data-sveltekit-reload href="/" class="h-[466px] w-[315px] overflow-hidden rounded-md">
		<img src={evento.imagen} alt="" class="h-full w-full rounded-md object-cover" />
	</a>

	<div class="text-center">
		<h5 class="mt-4 text-xl font-bold">{evento.nombre}</h5>
		<span class="block">{evento.fecha}</span>
		<span class="block">{evento.lugar}</span>
		<span class="block">{evento.hora.inicio} - {evento.hora.fin}</span>
	</div>
</div>
