<script lang="ts">
	import type { Establecimiento } from '$lib/types/establecimiento';

	type Props = {
		establecimiento: Establecimiento;
	};

	const { establecimiento }: Props = $props();

	import { Badge } from '$components/ui/badge/index.js';
</script>

<div class="relative h-screen w-full">
	<img
		src={establecimiento.primera_imagen}
		class="pointer-events-none h-full w-full select-none object-cover"
		alt="hero"
	/>

	<div class="absolute bottom-0 left-0 w-full space-y-6 bg-black bg-opacity-50 p-4 md:p-8 text-white">
		<a
			href="/establecimiento/{establecimiento.id}"
			class="flex items-center gap-2 transition-all duration-300 hover:underline"
			data-sveltekit-reload
		>
			<h5 class="font-display text-5xl lg:text-6xl">{establecimiento.nombre}</h5>
		</a>

		<p class="max-w-screen-xl md:text-base lg:text-lg">{establecimiento.descripcion}</p>

		<div class="flex space-x-4 overflow-x-auto">
			{#each establecimiento.etiquetas as tag}
				<Badge variant="purple" class="text-base font-light">{tag}</Badge>
			{/each}
		</div>
	</div>
</div>
