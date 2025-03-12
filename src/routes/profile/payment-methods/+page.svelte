<script lang="ts">
	import type { PageData } from './$types';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Pen, Trash2 } from 'lucide-svelte';

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
			<div class="flex w-full justify-between rounded-lg bg-neutral-900 p-4">
				<div class="flex flex-col gap-4">
					<div class="h-16 w-28 overflow-hidden rounded-lg border">
						<img class="h-16 w-28" src={paymentMethod.image} alt={paymentMethod.name} />
					</div>

					<div class="flex flex-col gap-1.5">
						<p class="text-xl font-bold">{paymentMethod.name}</p>
						<p class="text-xl text-neutral-400">**** **** **** {paymentMethod.last_digits}</p>
					</div>
				</div>

				<div class="flex h-full flex-col items-center justify-center gap-2">
					<Button variant="ghost" class="size-10" href="/profile/payment-methods/method"><Pen /></Button>
					<Button variant="ghost" class="size-10"><Trash2 /></Button>
				</div>
			</div>
		{/each}
	</div>
</div>
