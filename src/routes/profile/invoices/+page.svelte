<script lang="ts">
	import type { PageData } from './$types';
	import { Input } from '$lib/components/ui/input/index.js';

	let { data }: { data: PageData } = $props();

	const { establecimientos } = data;

	type Invoice = {
		image: string;
		name: string;
		type: 'Cover' | 'Cupon de consumo';
		quantity: number;
		total: number;
		payment_method: 'Efectivo' | 'Tarjeta' | 'Transferencia';
		date: string;
	};

	const invoices: Invoice[] = establecimientos.map((el) => {
		return {
			image: el.primera_imagen,
			name: el.nombre,
			type: Math.random() > 0.5 ? 'Cover' : 'Cupon de consumo',
			quantity: Math.floor(Math.random() * 10) + 1,
            total: Math.floor(Math.random() * 70000) + 20000,
			payment_method: ['Efectivo', 'Tarjeta', 'Transferencia'][Math.floor(Math.random() * 3)] as
				| 'Efectivo'
				| 'Tarjeta'
				| 'Transferencia',
			date: new Date(Date.now() - Math.floor(Math.random() * 10000000000))
				.toISOString()
				.split('T')[0]
		};
	});

	const groupedInvoices = invoices.reduce(
		(acc, el) => {
			if (!acc[el.date]) {
				acc[el.date] = [];
			}
			acc[el.date].push(el);
			return acc;
		},
		{} as Record<string, Invoice[]>
	);
</script>

<div class="flex flex-col gap-8">
	<h3 class="font-display text-3xl font-bold">Facturas</h3>

	<div class="flex flex-col gap-6">
		{#each Object.entries(groupedInvoices) as [date, invoices] (date)}
			<div class="flex flex-col gap-2">
				<h4 class="font-display text-xl">{date}</h4>
				<div class="flex flex-col gap-1">
					{#each invoices as invoice}
						<div class="flex max-h-max gap-6 rounded-lg bg-neutral-900 p-4">
							<div class="max-h-min">
								<img
									src={invoice.image}
									alt={invoice.name}
									class="block w-72 h-[156px] rounded-lg object-cover"
								/>
							</div>
							<div class="flex max-h-max flex-col gap-1">
								<p class="font-display text-xl font-semibold">{invoice.name}</p>
								<p class="text-lg font-bold text-neutral-200">{invoice.type}</p>
								<p class="text-lg text-neutral-200">
									<i class="bi bi-person"></i>
									<span>{invoice.quantity}</span>
								</p>
                                <p class="text-lg text-neutral-200">
                                    {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(invoice.total)}
                                </p>
								<p class="text-lg font-bold text-neutral-200">
									{#if invoice.payment_method === 'Efectivo'}
										<i class="bi bi-cash"></i>
									{:else if invoice.payment_method === 'Tarjeta'}
										<i class="bi bi-credit-card"></i>
									{:else if invoice.payment_method === 'Transferencia'}
										<i class="bi bi-currency-exchange"></i>
									{/if}
									<span>{invoice.payment_method}</span>
								</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.profile-data-field {
		@apply flex flex-col gap-y-1 rounded-lg bg-neutral-900 px-3 py-2;
	}
</style>
