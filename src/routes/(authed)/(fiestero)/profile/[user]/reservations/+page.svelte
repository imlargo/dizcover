<script lang="ts">
	import CuponReservation from '$lib/components/profile/CuponReservation.svelte';
	import type { Cupon } from '$lib/types/models/cupon';
	import type { PageData } from './$types';
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$components/ui/card';

	let { data }: { data: PageData } = $props();

	const cupones = $state<Cupon[]>(data.cupones || []);
</script>

<Card class="shadow-xl">
	<CardHeader>
		<CardTitle>Mis reservaciones</CardTitle>
		<CardDescription>
			En esta sección puedes ver las reservaciones de cupones que has realizado. Cada cupon te
			permite acceder a un evento o servicio específico.
		</CardDescription>
	</CardHeader>
	<CardContent class="space-y-6">
		{#if cupones.length > 0}
			{#each cupones as cupon (cupon.id)}
				<CuponReservation {cupon} />
			{/each}
		{:else}
			<p class="text-muted-foreground">No tienes cupones vigentes...</p>
		{/if}
	</CardContent>
</Card>
