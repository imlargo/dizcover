<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	import CreatePaymentMethod from '$lib/components/payments/CreatePaymentMethod.svelte';
</script>

<CreatePaymentMethod>
	
</CreatePaymentMethod>
