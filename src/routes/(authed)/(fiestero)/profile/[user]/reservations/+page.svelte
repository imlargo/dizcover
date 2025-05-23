<script lang="ts">
	import type { PageData } from './$types';
	import Qr from '$lib/components/kit/Qr.svelte';

	let { data }: { data: PageData } = $props();

	const establecimiento = data.establecimiento;
	const cupon = {
		descripcion:
			'Obtén el 25% de descuento en la compra de un six pack de cervezas en Nightclub Bolivar.',
		terminos_condiciones: 'Válido para cerveza Corona. Requisito mínimo de personas: 2',
		fecha_vigencia: {
			desde: '2025-03-03',
			hasta: '2025-03-09'
		},
		precio: 35000,
		code: 'QYWLYW1H'
	};

	import { Badge } from '$lib/components/ui/badge';

	const formatDate = (date: string) => {
		const options: Intl.DateTimeFormatOptions = {
			year: 'numeric',
			month: 'short',
			day: '2-digit'
		};
		return new Date(date).toLocaleDateString('es-ES', options);
	};

	const formatCurrency = (value: number): string => {
		return new Intl.NumberFormat('es-CO', {
			style: 'currency',
			currency: 'COP'
		}).format(value);
	};
</script>

<main class="space-y-4">
	<h2 class="font-display text-2xl font-semibold">Cupon de consumo</h2>

	{JSON.stringify(data.cupones)}

	<div class="grid grid-cols-2 gap-12 rounded-lg bg-neutral-900 p-8">
		<div class="space-y-8">
			<div class="space-y-4">
				<h3 class="font-display text-3xl">{establecimiento.nombre}</h3>
				<div class="flex flex-wrap gap-2">
					{#each establecimiento.etiquetas as tag}
						<Badge variant="purple">{tag}</Badge>
					{/each}
				</div>
			</div>

			<p class="max-w-prose text-xl">
				<span class="font-display">Descripción: </span>
				{cupon.descripcion}
			</p>

			<p class="max-w-prose text-xl">
				<span class="font-display">Terminos y condiciones: </span>
				{cupon.terminos_condiciones}
			</p>

			<p class="max-w-prose text-xl">
				<span class="font-display">Fecha de vigencia: </span>
				{formatDate(cupon.fecha_vigencia.desde)} - {formatDate(cupon.fecha_vigencia.hasta)}
			</p>
		</div>

		<div class="flex justify-end">
			<div class="max-w-max space-y-12 rounded-lg bg-neutral-500/80 p-6">
				<Qr content={cupon.code} size="lg" class="rounded-lg" />
				<div class="flex items-center justify-between">
					<p class="font-display text-2xl">Precio</p>
					<p class="font-display text-2xl">{formatCurrency(cupon.precio)}</p>
				</div>
			</div>
		</div>
	</div>
</main>
