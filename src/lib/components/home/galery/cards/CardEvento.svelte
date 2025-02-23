<script lang="ts">
	import { Badge } from '$components/ui/badge/index';
	import type { Evento } from '$lib/types/evento';

	type Props = {
		evento: Evento;
	};

	const { evento }: Props = $props();
</script>

<div class="flex flex-col items-center justify-center w-[315px]">
	<div class="overflow-hidden rounded-md h-[466px] w-[315px]">
		<a data-sveltekit-reload href="/evento/{evento.id}" class="overflow-hidden rounded-md">
			<img src={evento.primera_imagen} alt="" class="h-full w-full rounded-md object-cover" />
		</a>
	</div>
	

	<div class="text-center">
		<h5 class="mt-4 text-xl font-bold">{evento.nombre}</h5>
		<span class="block">{evento.fecha}</span>
		<span class="block">{evento.lugar}</span>
		<span class="block">{evento.hora?.inicio} - {evento.hora?.fin}</span>
	</div>
</div>
