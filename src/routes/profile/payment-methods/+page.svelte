<script lang="ts">
	import type { PageData } from './$types';
	import { Input } from '$lib/components/ui/input/index.js';

	let { data }: { data: PageData } = $props();

	type PaymentMethod = {
		image: string;
		name: 'Visa' | 'Mastercard' | 'Nequi' | 'Bancolombia';
		last_digits: string;
	};

	const userPaymentMethods: PaymentMethod[] = [
		{
			image: '',
			name: 'Visa',
			last_digits: '333'
		},
		{
			image: '',
			name: 'Mastercard',
			last_digits: '333'
		},
		{
			image: '',
			name: 'Nequi',
			last_digits: '333'
		},
		{
			image: '',
			name: 'Bancolombia',
			last_digits: '333'
		}
	];
</script>

<div class="flex flex-col gap-8">
	<h3 class="font-display text-3xl font-bold">Métodos de pago</h3>

	<div class="flex flex-col gap-6">
		{#each userPaymentMethods as paymentMethod}
			<div class="flex flex-col p-4 gap-4 bg-neutral-900 rounded-lg">
                <div class="border rounded-lg overflow-hidden h-16 w-28">
                    <img class="h-16 w-28" src={paymentMethod.image} alt={paymentMethod.name} />
                </div>

				<div class="flex flex-col gap-1.5">
					<p class="font-bold text-xl">{paymentMethod.name}</p>
					<p class="text-xl text-neutral-400">**** **** **** {paymentMethod.last_digits}</p>
				</div>
			</div>
		{/each}
	</div>
</div>
