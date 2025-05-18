<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const establecimiento = $state(data.establecimiento);
	import { Button } from '$lib/components/ui/button/index.js';
	import { Pencil, Star, Trash, View } from 'lucide-svelte';
</script>

<main class="space-y-4">
	<div class="flex items-center justify-between">
		<h2 class="font-display text-2xl">{establecimiento.nombre}</h2>

		<div class="flex items-center gap-x-2">
			<Button variant="ghost" size="icon">
				<View class="size-4" />
			</Button>

			<Button variant="ghost" size="icon">
				<Pencil class="size-4" />
			</Button>

			<Button variant="ghost" size="icon">
				<Trash class="size-4" />
			</Button>
		</div>
	</div>

	<div class="aspect-[3/1] w-full overflow-hidden rounded-lg">
		<img
			src={establecimiento.primera_imagen}
			alt={establecimiento.nombre}
			class="h-auto w-full object-cover"
		/>
	</div>

	<div class="grid grid-cols-2 gap-4">
		<div class="relative flex items-center justify-center rounded-lg bg-neutral-900 p-8">
			<div class="space-y-2 text-center">
				<p class="font-display text-4xl">$3.500.000</p>
				<p class="font-medium text-neutral-400">Total ingresos</p>
			</div>

			<div class="absolute bottom-0 right-0 p-4">
				<span class="flex items-center gap-1 font-bold text-green-500">
					<span>100%</span>
				</span>
			</div>
		</div>

		<div class="grid grid-cols-2 gap-8 rounded-lg bg-neutral-900 p-8">
			<div class="space-y-2">
				<p class="font-display text-3xl">
					{establecimiento.calificacion_promedio.toFixed(1)}
				</p>
				<p class="font-medium text-neutral-400 flex gap-1 items-center">
					
					<span>Calificación</span>
				</p>
			</div>

			<div class="space-y-2">
				<p class="font-display text-3xl">300</p>
				<p class="font-medium text-neutral-400">Boletas vendidas</p>
			</div>

			<div class="space-y-2">
				<p class="font-display text-3xl">123</p>
				<p class="font-medium text-neutral-400">Visualizaciones</p>
			</div>

			<div class="space-y-2">
				<p class="font-display text-3xl">742</p>
				<p class="font-medium text-neutral-400">Cupones vendidos</p>
			</div>
		</div>
	</div>
</main>
