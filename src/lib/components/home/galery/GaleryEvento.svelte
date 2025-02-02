<script lang="ts">
	import type { Evento } from '$lib/types/evento';
	import * as Carousel from '$components/ui/carousel/index.js';
	import CardEvento from './CardEvento.svelte';
	import { DatabaseController } from '$lib/services/db';

	type Props = {
		title: string;
		eventos: Evento[];
	};

	const { title, eventos }: Props = $props();
</script>

<div class="w-full space-y-8">
	<h3 class="text-center text-3xl font-bold">{title}</h3>

	<div class="px-16">
		<Carousel.Root
			class="w-full"
			opts={{
				loop: true
			}}
		>
			<Carousel.Content class="-ml-8">
				{#each eventos as evento}
					<Carousel.Item class="pl-8 md:basis-1/2 lg:basis-1/5">
						<CardEvento {evento} />
					</Carousel.Item>
				{/each}
			</Carousel.Content>
			<Carousel.Previous />
			<Carousel.Next />
		</Carousel.Root>
	</div>
</div>
