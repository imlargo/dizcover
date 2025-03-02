<script lang="ts">
	import type { Evento, PricingEvento } from '$lib/types/evento';
	import NumberField from '../kit/NumberField.svelte';
	import { Input } from '$lib/components/ui/input/index.js';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
    import { Button } from "$lib/components/ui/button/index.js";

	type BookingDetails = PricingEvento & { numPersonas: number };

	type Props = {
		evento: Evento;
		pricing: PricingEvento[];
	};

	const { evento, pricing }: Props = $props();

	let searchValue = $state('');
	let bookingDetails: BookingDetails[] = $state(
		pricing.map((tier) => ({ ...tier, numPersonas: 0 }))
	);

	const toPesos = (price: number) => price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
	const toNumber = (price: string) => parseInt(price.split('.')[0]);
	const normalizeString = (str: string) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
	const matchSearch = (search: string, target: string) => normalizeString(target).toLowerCase().includes(normalizeString(search).toLowerCase());
	let filteredPricing = $derived(bookingDetails.filter((tier) => matchSearch(searchValue, tier.nombre)));
</script>

<div class="grid grid-cols-2 gap-x-4 max-h-min">
	<div class="col-span-1 rounded-lg max-h-max">
		<div class="flex flex-col divide-y divide-neutral-500 border border-neutral-500 rounded">
			<div class="glass flex justify-between px-4 py-4">
				<Input
					type="text"
					bind:value={searchValue}
					placeholder="Busca y elige tus entradas"
					class="max-w-xs rounded-full bg-transparent"
				/>
			</div>
			<ScrollArea class="h-[256px] w-full">
				{#each filteredPricing as tier (tier.id)}
					<div class="glass grid grid-cols-3 justify-between px-4 py-4">
						<span class="text-lg font-semibold">{tier.nombre}</span>
						<div class="flex gap-2 items-center justify-end">
							<NumberField
								min={0}
								max={10}
								bind:value={tier.numPersonas}
								onChange={(value) => (tier.numPersonas = value)}
							/>

                            
						</div>

						<span class="flex gap-x-3 justify-end text-lg font-semibold items-center">

                            {#if tier.numPersonas > 0}
                                <Button
                                    variant="ghost" 
                                    class="hover:bg-red-100/20 text-red-400 hover:text-red-500 size-8 text-lg"
                                    onclick={() => (tier.numPersonas = 0)}
                                >
                                    <i class="bi bi-trash"></i>
                                </Button>
                            {/if}

							<span>
                                <span>COP</span>
							<span>
								{toPesos(toNumber(tier.precio) * (tier.numPersonas || 1))}
							</span>
                            </span>
						</span>
					</div>
				{/each}
			</ScrollArea>
		</div>
	</div>
	<div class="col-span-1 h-full rounded-lg bg-neutral-900">
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
