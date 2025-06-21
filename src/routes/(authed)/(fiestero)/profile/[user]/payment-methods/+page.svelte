<script lang="ts">
	import type { PageData } from './$types';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Pen, Trash2 } from 'lucide-svelte';
	import { storeAuth } from '$lib/store/auth.svelte';
	import type { PaymentMethod } from '$lib/types/models/payments';
	import PaymentMethodComponent from '$lib/components/payments/PaymentMethod.svelte';

	let { data }: { data: PageData } = $props();

	const userPaymentMethods: PaymentMethod[] = $state(data.userPaymentMethods || []);
</script>

{JSON.stringify(userPaymentMethods)}

<div class="flex flex-col gap-8">
	<div class="flex w-full items-center justify-between">
		<h3 class="font-display text-3xl font-bold">Métodos de pago</h3>

		<Button href="/profile/{storeAuth.user?.id}/payment-methods/create">Crear</Button>
	</div>

	<div class="flex flex-col gap-6">
		{#each userPaymentMethods as paymentMethod}
			<PaymentMethodComponent {paymentMethod} />
		{/each}
	</div>
</div>
