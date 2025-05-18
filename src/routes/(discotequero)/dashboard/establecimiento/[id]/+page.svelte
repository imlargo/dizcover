<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const establecimiento = $state(data.establecimiento);
	import { Button } from '$lib/components/ui/button/index.js';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import { ChevronUp, History, Plus } from 'lucide-svelte';
	import { Pencil, Star, Trash, View } from 'lucide-svelte';

	const cupones = [
		{
			image: '/promo.jpg',
			establecimiento: 'Night club bolivar',
			descripcion: 'Six pack cervezas',
			porcentaje: 25
		},
		{
			image: '/promo.jpg',
			establecimiento: 'Night club bolivar',
			descripcion: 'Six pack cervezas',
			porcentaje: 25
		},
		{
			image: '/promo.jpg',
			establecimiento: 'Night club bolivar',
			descripcion: 'Six pack cervezas',
			porcentaje: 25
		},
		{
			image: '/promo.jpg',
			establecimiento: 'Night club bolivar',
			descripcion: 'Six pack cervezas',
			porcentaje: 25
		},
		{
			image: '/promo.jpg',
			establecimiento: 'Night club bolivar',
			descripcion: 'Six pack cervezas',
			porcentaje: 25
		},
		{
			image: '/promo.jpg',
			establecimiento: 'Night club bolivar',
			descripcion: 'Six pack cervezas',
			porcentaje: 25
		}
	];
</script>

<main class="space-y-8">
	<div class="flex items-center justify-between">
		<h2 class="font-display text-3xl">{establecimiento.nombre}</h2>

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
				<p class="flex items-center gap-1 font-medium text-neutral-400">
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

	<div class="space-y-4 rounded-lg bg-neutral-900 p-4">
		<h2 class="font-semibold text-neutral-400">Cover y reservas</h2>
		<ScrollArea class="h-[200px] w-full">
			{#each cupones as cupon}
				<div class="flex justify-between border-b border-neutral-800 py-3">
					<span>@Juan ha usado {cupon.descripcion}</span>
					<span class="text-neutral-400">Abril 12, 2025</span>
				</div>
			{/each}
		</ScrollArea>
	</div>

	<div class="space-y-4">
		<div class="flex items-center gap-4">
			<h2 class="font-display max-w-max text-2xl">Promociones</h2>
		</div>

		<div class="grid grid-cols-6 gap-2">
			{#each cupones as cupon}
				<div class="space-y-4 rounded-lg bg-neutral-700 p-4">
					<img
						src={cupon.image}
						alt={cupon.descripcion}
						class="block aspect-square w-full rounded-lg object-cover"
					/>
					<div class="space-y-1 text-center">
						<p class="font-display text-lg">{cupon.establecimiento}</p>
						<p class="text-lg">{cupon.descripcion}</p>
						<p class="font-display text-lg">{cupon.porcentaje}% dcto</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</main>
