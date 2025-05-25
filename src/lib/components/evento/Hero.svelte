<script lang="ts">
	import type { Evento, PricingEvento } from '$lib/types/evento';
	import { Button } from '$lib/components/ui/button/index.js';

	type Props = {
		evento: Evento;
		pricing: PricingEvento[];
	};

	const { evento, pricing }: Props = $props();
	const toPesos = (price: number) =>
		price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
	const toNumber = (price: string) => parseInt(price.split('.')[0]);
</script>

<div class="flex flex-col gap-x-12 md:grid md:grid-cols-12">
	<div class="flex items-center justify-center md:col-span-6">
		<img src={evento.primera_imagen} alt={evento.nombre} class="h-[560px] w-[380px] object-cover" />
	</div>

	<div class="flex flex-col gap-4 md:col-span-6">
		<h1 class="text-3xl font-bold">{evento.nombre}</h1>

		<div class="flex flex-col gap-2">
			<span class="flex items-center gap-2">
				<i class="bi bi-calendar-event"></i>
				<span>{evento.fecha}</span>
			</span>

			<span class="flex items-center gap-2">
				<i class="bi bi-geo-alt-fill"></i>
				<span>{evento.lugar}</span>
			</span>

			<span class="flex items-center gap-2">
				<i class="bi bi-clock"></i>
				<span>{evento.hora?.inicio} - {evento.hora?.fin}</span>
			</span>
		</div>

		<div class="flex flex-col gap-y-1 overflow-hidden overflow-y-scroll rounded-md">
			{#each pricing as tier}
				<div class="glass flex justify-between px-4 py-4">
					<span class="text-lg font-semibold">{tier.nombre}</span>
					<span class="text-lg font-semibold">COP {toPesos(toNumber(tier.precio))}</span>
				</div>
			{/each}
		</div>

		<Button class="max-w-max">Más informacion</Button>
	</div>
</div>

<style>
	.glass {
		background: rgba(255, 255, 255, 0.2);
		box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(5px);
		-webkit-backdrop-filter: blur(5px);
	}
</style>
