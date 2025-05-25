<script lang="ts">
	import type { Evento } from '$lib/types/evento';

	type Props = {
		events: Evento[];
	};

	const { events }: Props = $props();
</script>

<div class="grid w-full grid-cols-1 gap-12 md:grid-cols-3">
	{#each events as event}
		<a
			data-sveltekit-reload
			href="/evento/{event.id}"
			class="aspect-w-16 aspect-h-9 col-span-1 h-[620px] w-auto overflow-hidden rounded-md"
		>
			<img
				src={event.primera_imagen}
				alt={event.nombre}
				class="h-full w-full object-cover transition-all duration-300 hover:scale-110"
			/>
		</a>
	{/each}
</div>
