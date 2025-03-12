<script lang="ts">
	import { Badge } from '$components/ui/badge/index';
	import type { Establecimiento } from '$lib/types/establecimiento';

	type Props = {
		establecimiento: Establecimiento;
		variant?: 'base' | 'green';
	};

	const { establecimiento, variant="base" }: Props = $props();
</script>

<div class="relative overflow-hidden rounded-md">
	<div class="h-[349px] w-[695px]">
		<a
			data-sveltekit-reload
			href="/establecimiento/{establecimiento.id}"
			class="h-[349px] w-[695px] overflow-hidden rounded-md"
		>
			<img
				src={establecimiento.primera_imagen}
				alt=""
				class="max-w-full rounded-md object-cover transition-all duration-300 hover:scale-105"
			/>
		</a>
	</div>

	<span
		class="absolute left-0 top-0 rounded-br-md bg-black bg-opacity-70 px-5 py-3 text-lg font-bold text-white"
		>{establecimiento.nombre}</span
	>

	<div
		class="flex w-full absolute bottom-0 left-0 items-center gap-2 bg-black bg-opacity-50 py-5 overflow-x-auto px-4"
	>
		{#each establecimiento.etiquetas as tag}
			<Badge variant={variant === "base" ? "purple" : "green"}>{tag}</Badge>
		{/each}
	</div>
</div>
