<script lang="ts">
	import { formatCurrency, formatDate } from '$lib/utils/tools';
	import type { PageData } from './$types';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import type { Cupon } from '$lib/types/models/cupon';
	import type { Establecimiento } from '$lib/types/establecimiento';
	import { Button } from '$lib/components/ui/button/index.js';
	import { CuponController } from '$lib/controllers/cupon';
	import { toast } from 'svelte-sonner';
	import type { ApiErrorResponse } from '$lib/services/api';

	let { data }: { data: PageData } = $props();

	const cupon = data.cupon as Cupon;
	const establecimiento = data.establecimiento as Establecimiento;

	const cuponController = new CuponController();

	async function reclamarCupon() {
		toast.loading('Reclamando cupón...');
		try {
			await cuponController.reclamarCupon(cupon.id);
			toast.success('Cupón reclamado con éxito');
		} catch (error) {
			toast.error('Error al reclamar el cupón', {
				description: (error as ApiErrorResponse).message
			});
		}
	}
</script>

<main class="space-y-4 bg-neutral-900 py-8">
	<h2 class="font-display text-center text-2xl font-semibold">Cupon de consumo</h2>

	<div class="grid grid-cols-3 place-items-center gap-12 rounded-lg p-8">
		<div class="space-y-8">
			<div class="space-y-4">
				<h3 class="font-display text-3xl">{establecimiento.nombre}</h3>
				<div class="flex flex-wrap gap-2">
					{#each establecimiento.etiquetas || [] as tag}
						<Badge variant="purple">{tag}</Badge>
					{/each}
				</div>
			</div>

			<p class="max-w-prose text-xl">
				<span class="font-display">Descripcion: </span>
				{cupon?.descripcion}
			</p>

			<p class="max-w-prose text-xl">
				<span class="font-display">Terminos y condiciones: </span>
				<span>Requisito mínimo de personas: {cupon.minimo_personas}</span>
			</p>

			<p class="max-w-prose text-xl">
				<span class="font-display">Fecha de vigencia: </span>
				{formatDate(cupon?.fecha_vigencia?.desde)} - {formatDate(cupon?.fecha_vigencia?.hasta)}
			</p>
		</div>

		<div class="flex justify-end">
			<div class="max-w-96 space-y-12 rounded-lg bg-neutral-500/80 p-6">
				<img class="w-full rounded-lg" alt="" src={cupon.imagen} />
				<div class="flex items-center justify-between">
					<p class="font-display text-2xl">Descuento</p>
					<p class="font-display text-2xl">%{cupon.porcentaje_descuento}</p>
				</div>
			</div>
		</div>

		<div class="flex w-full justify-end">
			<div class="max-w-max space-y-2">
				<Button
					onclick={reclamarCupon}
					variant="outline"
					class="max-w-max p-8 font-semibold text-black">Reclamar</Button
				>
				<p class="max-w-96 text-muted-foreground">
					*Una vez reclamado el cupón, no usarlo puede incurrir en penalizaciones
				</p>
			</div>
		</div>
	</div>
</main>
