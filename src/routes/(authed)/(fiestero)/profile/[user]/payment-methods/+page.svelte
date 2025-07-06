<script lang="ts">
	import type { PageData } from './$types';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { CreditCard, Pen, Trash2 } from 'lucide-svelte';
	import { storeAuth } from '$lib/store/auth.svelte';
	import type { PaymentMethod } from '$lib/types/models/payments';
	import PaymentMethodComponent from '$lib/components/payments/PaymentMethod.svelte';
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$components/ui/card';

	let { data }: { data: PageData } = $props();

	const userPaymentMethods: PaymentMethod[] = $state(data.userPaymentMethods || []);
</script>

<Card class="shadow-xl">
	<CardHeader>
		<div class="flex w-full items-center justify-between">
			<CardTitle>Métodos de pago</CardTitle>

			<Button href="/profile/{storeAuth.user?.id}/payment-methods/create">
				<CreditCard />
				<span>Registrar</span>
			</Button>
		</div>
		<CardDescription>
			En esta sección puedes ver y administrar tus métodos de pago registrados. Si deseas agregar un
			nuevo método, haz clic en el botón "Registrar".
		</CardDescription>
	</CardHeader>
	<CardContent class="space-y-6">
		{#if userPaymentMethods.length > 0}
			<div class="flex flex-col gap-6">
				{#each userPaymentMethods as paymentMethod}
					<PaymentMethodComponent {paymentMethod} />
				{/each}
			</div>
		{:else}
			<div class="text-center text-muted-foreground">
				No tienes métodos de pago registrados. Haz clic en "Registrar" para agregar uno nuevo.
			</div>
		{/if}
	</CardContent>
</Card>
