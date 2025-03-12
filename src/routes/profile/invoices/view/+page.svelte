<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
    const { invoice, establecimiento } = data;
    
    type Field = {
        label: string,
        value: string,
    }

    const fieldsData: Field[] = [
        {
            label: 'Establecimiento',
            value: establecimiento.nombre,
        },
        {
            label: 'Fecha y hora',
            value: invoice.date,
        },
        {
            label: 'Tipo de producto',
            value: invoice.type,
        },
        {
            label: 'Cantidad',
            value: invoice.quantity.toString(),
        },
        {
            label: 'Total',
            value: `${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(invoice.total)}`,
        },

    ]
</script>

<div class="flex flex-col gap-8">
	<h3 class="font-display text-3xl font-bold">Facturas</h3>

	<div class="flex flex-col gap-2">
		<div class="flex max-h-max gap-6 justify-between rounded-lg bg-neutral-900 p-4">
            <div class="flex gap-6">
                <div class="max-h-min">
                    <img
                        src={invoice.image}
                        alt={invoice.name}
                        class="block w-72 h-[156px] rounded-lg object-cover"
                    />
                </div>
                <div class="flex max-h-max flex-col gap-1 max-w-max">
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
        </div>

        {#each fieldsData as field}
        <div class="flex flex-col gap-y-1 rounded-lg bg-neutral-900 px-3 py-2">
            <span class="text-neutral-600">{field.label}</span>
            <p>{field.value}</p>
        </div>
        {/each}
	</div>
</div>
