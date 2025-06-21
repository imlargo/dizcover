<script lang="ts">
	import { getPaymentMethodTypeLabel, PaymentMethodType, type PaymentMethod } from '$lib/types/models/payments';
	import { Button } from '$lib/components/ui/button/index.js';
	import { storeAuth } from '$lib/store/auth.svelte';
	import { Pen, Trash2 } from 'lucide-svelte';

	type Props = {
		paymentMethod: PaymentMethod;
	};

	const { paymentMethod }: Props = $props();
</script>

<div class="flex w-full justify-between rounded-lg bg-neutral-900 p-4">
	<div class="flex flex-col gap-4">
		<div class="h-16 w-28 overflow-hidden rounded-lg border">
			{#if paymentMethod.tipo === PaymentMethodType.Nequi}
				<div class="flex h-full w-full items-center justify-center bg-white p-4">
					<img src="/assets/nequi.svg" alt={paymentMethod.tipo} />
				</div>
			{:else if paymentMethod.tipo === PaymentMethodType.Card}
				<div class="flex h-full w-full items-center justify-center bg-white p-2">
					<img src="/assets/nequi.svg" alt={paymentMethod.tipo} />
				</div>
			{:else if paymentMethod.tipo === PaymentMethodType.Bancolombia}
				<div class="flex h-full w-full items-center justify-center bg-white px-2">
					<img src="/assets/bancolombia.svg" alt={paymentMethod.tipo} />
				</div>
			{/if}
		</div>

		<div class="flex flex-col gap-1.5">
			<p class="text-xl font-bold">{getPaymentMethodTypeLabel(paymentMethod.tipo)}</p>
			{#if paymentMethod.tipo === PaymentMethodType.Nequi}
				<p class="text-xl text-neutral-400">{paymentMethod.celular_nequi}</p>
			{:else if paymentMethod.tipo === PaymentMethodType.Bancolombia}
				<p class="text-xl text-neutral-400">**** **** ****</p>
			{:else}
				<p class="text-xl text-neutral-400">Método de pago desconocido</p>
			{/if}
		</div>
	</div>

	<div class="flex h-full flex-col items-center justify-center gap-2">
		<!--
		<Button
			variant="ghost"
			class="size-10"
			href="/profile/{storeAuth.user?.id}/payment-methods/method"><Pen /></Button
		>
			-->
		<Button variant="ghost" class="size-10"><Trash2 /></Button>
	</div>
</div>
