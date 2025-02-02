<script lang="ts">
	import type { Evento } from '$lib/types/evento';

	type Props = {
		events: Evento[];
	};

	const { events }: Props = $props();
</script>

<div class="grid w-full grid-cols-3 gap-12">
	{#each events as event}
		<a
			data-sveltekit-reload
			href="/evento/{event.id}"
			class="col-span-1 h-[620] w-[418] overflow-hidden rounded-md"
		>
			<img
				src={event.imagen}
				alt={event.nombre}
				class="h-full w-full object-cover transition-all duration-300 hover:scale-110"
			/>
		</a>
	{/each}
</div>
