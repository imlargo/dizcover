<script lang="ts">
	import type { ReviewEstablecimiento } from '$lib/types/models/review';
	import * as Card from '$lib/components/ui/card/index.js';
	import Stars from './Stars.svelte';

	type Props = {
		review: ReviewEstablecimiento;
	};

	const { review }: Props = $props();

	const formatDateString = (dateString: string): string => {
		const date = new Date(dateString);
		return date.toLocaleDateString('es-ES', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	};
</script>

<Card.Root>
	<Card.Content>
		<Card.Title class="text-base">{review.fiestero}</Card.Title>
		<div class="flex flex-col gap-1">
			<div class="flex items-center gap-2">
				<Stars rate={review.calificacion} />
				<span class="text-muted-foreground">{formatDateString(review.fecha)}</span>
			</div>

			<div>
				{#if review.comentario}
					<p>{review.comentario}</p>
				{:else}
					<p class="text-muted-foreground">Sin comentario especificado</p>
				{/if}
			</div>
		</div>
	</Card.Content>
</Card.Root>
