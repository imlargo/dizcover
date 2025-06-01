<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import type { Establecimiento } from '$lib/types/establecimiento';
	import type { ReviewEstablecimiento } from '$lib/types/models/review';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import StarRate from './StarRate.svelte';
	import { storeAuth } from '$lib/store/auth.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { ReviewsController } from '$lib/controllers/reviews';
	import { toast } from 'svelte-sonner';

	type Props = {
		establecimiento: Establecimiento;
		onReviewCreation?: (review: ReviewEstablecimiento) => void;
	};

	const { establecimiento, onReviewCreation }: Props = $props();

	const review = $state<Partial<ReviewEstablecimiento>>({
		fiestero: storeAuth.user?.fiestero?.id as unknown as number,
		establecimiento: establecimiento.id as number,
		comentario: '',
		calificacion: '' as unknown as number,
		fecha: new Date().toISOString().split('T')[0]
	});

	const isCompleted = $derived.by(() => {
		const hasComment = (review.comentario || '').trim().length > 0;
		const hasRating =
			review.calificacion !== null &&
			review.calificacion !== undefined &&
			typeof review.calificacion === 'number';
		return hasComment && hasRating;
	});

	let isSumbiting = $state(false);
	const reviewsController = new ReviewsController();
	async function handleSubmit() {
		try {
			toast.loading('Publicando tu review...');

			isSumbiting = true;
			review.fecha = new Date().toISOString().split('T')[0];
			review.fiestero = storeAuth.user?.fiestero?.id as unknown as number;

			const created = await reviewsController.createReviewEstablecimiento(
				review.fiestero as number,
				establecimiento.id as number,
				review.comentario as string,
				review.calificacion as number
			);

			toast.success('Review publicada con éxito');

			if (onReviewCreation && created) {
				onReviewCreation(created);
			}
		} catch (error) {
			toast.error('Error al publicar tu review. Inténtalo de nuevo más tarde.');
		} finally {
			isSumbiting = false;
		}
	}
</script>

<Card.Root>
	<Card.Header>
		<Card.Title class="text-lg">Deja tu review</Card.Title>
		<Card.Description>Comparte tu experiencia en {establecimiento.nombre}</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="flex flex-col gap-4">
			<div class="flex flex-col gap-1">
				<Label for="email">Tu calificación</Label>
				<StarRate
					onRate={(rate) => (review.calificacion = rate)}
					onDeleteRate={() => (review.calificacion = null as unknown as number)}
				/>
			</div>

			<div class="flex flex-col gap-2">
				<Label for="email">Tu comentario</Label>
				<Textarea bind:value={review.comentario} placeholder="Cuentanos sobre tu experiencia..." />
			</div>
		</div>
	</Card.Content>

	<Card.Footer class="flex justify-end">
		<Button disabled={!isCompleted || isSumbiting} onclick={handleSubmit}>Publicar</Button>
	</Card.Footer>
</Card.Root>
