<script lang="ts">
	import { Badge } from '$components/ui/badge/index';
	import type { Evento } from '$lib/types/evento';

	type EventCardVariant = 'base' | 'cover';

	type Props = {
		evento: Evento;
		variant?: EventCardVariant;
	};

	const { evento, variant = 'base' }: Props = $props();
</script>

<div class="flex w-[315px] flex-col items-center justify-center">
	<div class="h-[466px] w-[315px] overflow-hidden rounded-md">
		<a data-sveltekit-reload href="/evento/{evento.id}" class="overflow-hidden rounded-md">
			<img src={evento.primera_imagen} alt="" class="h-full w-full rounded-md object-cover" />
		</a>
	</div>

	{#if variant !== 'cover'}
		<div class="text-center">
			<h5 class="mt-4 text-xl font-bold">{evento.nombre}</h5>
			<span class="block">{evento.fecha}</span>
			<span class="block">{evento.lugar}</span>
			<span class="block">{evento.hora?.inicio} - {evento.hora?.fin}</span>
		</div>
	{/if}
</div>
