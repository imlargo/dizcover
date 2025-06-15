<script lang="ts">
	import type { Establecimiento } from '$lib/types/establecimiento';
	import type { Cupon } from '$lib/types/models/cupon';
	import Qr from '$lib/components/kit/Qr.svelte';

	import { Badge } from '$lib/components/ui/badge';

	const formatDate = (date?: string) => {
		if (!date) return 'Fecha no disponible';
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
	type Props = {
		cupon: Cupon;
	};

	const { cupon }: Props = $props();
</script>

{JSON.stringify(cupon, null, 2)}

<div class="grid grid-cols-2 gap-12 rounded-lg bg-neutral-900 p-8">
	<div class="space-y-8">
		<div class="space-y-4">
			<h3 class="font-display text-3xl">{cupon?.establecimiento?.nombre}</h3>
			<div class="flex flex-wrap gap-2">
				{#each cupon?.establecimiento?.etiquetas || [] as tag}
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
			{formatDate(cupon?.fecha_vigencia?.desde)} - {formatDate(cupon?.fecha_vigencia?.hasta)}
		</p>
	</div>

	<div class="flex justify-end">
		<div class="max-w-max space-y-12 rounded-lg bg-neutral-500/80 p-6">
			<Qr content={cupon.codigo_consumo} size="lg" class="rounded-lg" />
			<div class="flex items-center justify-between">
				<p class="font-display text-2xl">Precio</p>
				<p class="font-display text-2xl">{formatCurrency(cupon.precio_sin_descuento_producto)}</p>
			</div>
		</div>
	</div>
</div>
