<script lang="ts">
	import CuponReservation from '$lib/components/profile/CuponReservation.svelte';
	import type { Cupon } from '$lib/types/models/cupon';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const cupones = $state<Cupon[]>(data.cupones?.caducados || []);
</script>

<main class="space-y-4">
	<h2 class="font-display text-2xl font-semibold">Cupon de consumo</h2>

	{#each cupones as cupon}
		<CuponReservation {cupon} />
	{/each}
</main>
