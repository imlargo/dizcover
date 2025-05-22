<script lang="ts">
	import type { PageData } from './$types';
	import { ChevronUp, History, Plus } from 'lucide-svelte';

	let { data }: { data: PageData } = $props();
	import { Button } from '$lib/components/ui/button/index.js';

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

<div class="flex flex-col gap-y-8">
	<div class="flex items-center justify-between">
		<h1 class="font-display text-3xl">Mis promociones</h1>
	</div>

	<div class="grid grid-cols-2 gap-12">
		<div class="relative flex items-center justify-center rounded-lg bg-primary-foreground p-8">
			<div class="space-y-2 py-12 text-center">
				<p class="font-display text-4xl">$500.000,00</p>
				<p class="font-medium text-neutral-400">Ingresos por cupones</p>
			</div>

			<div class="absolute bottom-0 right-0 p-4">
				<span class="flex items-center gap-1 font-bold text-green-500">
					<ChevronUp />
					<span>100%</span>
				</span>
			</div>
		</div>

		<div class="grid grid-cols-2 gap-8">
			<div
				class="flex flex-col items-center justify-center gap-2 rounded-lg bg-primary-foreground p-8 text-center"
			>
				<p class="font-display text-4xl">38</p>
				<p class="font-medium text-neutral-400">Cupones activos</p>
			</div>

			<div
				class="flex flex-col items-center justify-center gap-2 rounded-lg bg-primary-foreground p-8 text-center"
			>
				<p class="font-display text-4xl">700</p>
				<p class="font-medium text-neutral-400">Cupones reclamados</p>
			</div>
		</div>
	</div>

	<div class="space-y-6">
		<div class="space-y-4">
			<div class="flex items-center gap-4">
				<h2 class="font-display max-w-max text-2xl">Nightclub bolivar</h2>

				<Button
					size="icon"
					variant="secondary"
					class="flex items-center justify-center rounded-full"
				>
					<Plus />
				</Button>
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
		<div class="space-y-4">
			<div class="flex items-center gap-4">
				<h2 class="font-display max-w-max text-2xl">Nightclub bolivar</h2>

				<Button
					size="icon"
					variant="secondary"
					class="flex items-center justify-center rounded-full"
				>
					<Plus />
				</Button>
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
	</div>
</div>
