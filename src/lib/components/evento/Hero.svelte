<script lang="ts">
	import type { Evento } from '$lib/types/evento';

	type Props = {
		evento: Evento;
	};

    type Tier = {
        label: string;
        price: number;
    }

	const { evento }: Props = $props();

    const tierOptions: Tier[] = [
        { label: "VIP", price: 200000 },
        { label: "General", price: 100000 },
        { label: "Balcony", price: 150000 },
        { label: "Box", price: 250000 }
    ];
</script>

<div class="grid grid-cols-12 gap-x-12">
	<div class="col-span-6">
		<img src={evento.primera_imagen} alt={evento.nombre} class="h-[560px] w-[380px] object-cover" />
	</div>

	<div class="col-span-6 flex flex-col gap-4">
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

		<div class="flex flex-col rounded-md overflow-hidden gap-y-1 overflow-y-scroll">
            {#each tierOptions as tier}
                <div class="flex justify-between px-4 py-4 glass">
                    <span class="text-lg font-semibold">{tier.label}</span>
                    <span class="text-lg font-semibold">{tier.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</span>
                </div>
            {/each}
        </div>


        <button class="px-4 py-2 rounded-lg border-2 border-white w-52 font-bold">Más informacion</button>
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
