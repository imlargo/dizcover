<script lang="ts">
	import { storeAuth } from '$lib/store/auth.svelte';
	import { ChevronUp, Eye, Star } from 'lucide-svelte';
	import type { PageData } from './$types';
	import type { Establecimiento } from '$lib/types/establecimiento';

	let { data }: { data: PageData } = $props();

	const establecimientos = $state<Establecimiento[]>(data.establecimientos);
</script>

<div class="flex flex-col gap-y-8">
	<div class="flex items-center justify-between">
		<h1 class="font-display text-3xl">Bienvenid@, {storeAuth.user?.nombre_usuario}</h1>
	</div>

	<div class="grid grid-cols-2 gap-12">
		<div class="relative flex items-center justify-center rounded-lg bg-neutral-900 p-8">
			<div class="space-y-2 text-center">
				<p class="font-display text-4xl">$3.500.000</p>
				<p class="font-medium text-neutral-400">Total ingresos</p>
			</div>

			<div class="absolute bottom-0 right-0 p-4">
				<span class="flex items-center gap-1 font-bold text-green-500">
					<ChevronUp />
					<span>100%</span>
				</span>
			</div>
		</div>

		<div class="grid grid-cols-2 gap-8 rounded-lg bg-neutral-900 p-8">
			<div class="space-y-2">
				<p class="font-medium text-neutral-400">Ultimas reservas</p>
				<p class="font-display text-3xl">20</p>
			</div>

			<div class="space-y-2">
				<p class="font-medium text-neutral-400">Cupones restantes</p>
				<p class="font-display text-3xl">3</p>
			</div>

			<div class="space-y-2">
				<p class="font-medium text-neutral-400">Total visualizaciones:</p>
				<p class="font-display text-3xl">3.7k</p>
			</div>

			<div class="space-y-2">
				<p class="font-medium text-neutral-400">Total favoritos</p>
				<p class="font-display text-3xl">742</p>
			</div>
		</div>
	</div>

	<div class="space-y-2">
		{#each establecimientos as establecimiento}
			<div class="flex max-h-max justify-between gap-6 rounded-lg bg-neutral-900 p-4">
				<div class="flex gap-6 items-center">
					<div class="max-h-min">
						<img
							src={establecimiento.primera_imagen}
							alt={establecimiento.nombre}
							class="block h-[156px] w-72 rounded-lg object-cover"
						/>
					</div>
					<div class="flex max-h-max max-w-max flex-col gap-1">
						<p class="font-display text-2xl font-semibold">{establecimiento.nombre}</p>
						<p class="flex items-center gap-1 text-lg font-bold text-neutral-200">
							<Eye />
							<span>2.5k</span>
						</p>
						<p class="flex items-center gap-1 text-lg text-neutral-200">
							<Star />
							<span>{establecimiento.calificacion_promedio}</span>
						</p>
						<p class="flex items-center gap-1 text-lg text-neutral-200">Calle 123</p>
					</div>
				</div>
                <div class="flex h-full max-w-max flex-col items-baseline justify-end">
                    <a
                        class="inline-flex rounded-md border border-white px-4 py-2 font-semibold text-white"
                        href="/">Leer más</a
                    >
                </div>
			</div>
		{/each}
	</div>
</div>
