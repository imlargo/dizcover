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

	<div class="absolute bottom-0 left-0 w-full space-y-6 bg-black bg-opacity-50 p-8 text-white">
		<a href="/establecimiento/{establecimiento.id}" class="flex items-center gap-2 hover:underline transition-all duration-300" data-sveltekit-reload>
			<h5 class="font-display text-6xl">{establecimiento.nombre}</h5>
			<i class="bi bi-arrow-right text-4xl"></i>
		</a>

		<p class="max-w-screen-xl text-xl">{establecimiento.descripcion}</p>

		<div class="flex space-x-4">
			{#each establecimiento.etiquetas as tag}
				<Badge variant="purple" class="text-base">{tag}</Badge>
			{/each}
		</div>
	</div>
</div>
