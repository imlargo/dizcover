<script lang="ts">
	import type { Establecimiento } from '$lib/types/establecimiento';
	import * as Carousel from '$components/ui/carousel/index.js';
	import CardEstablecimiento from './CardEstablecimiento.svelte';

	type Props = {
		title: string;
		establecimientos: Establecimiento[];
	};

	const { title, establecimientos }: Props = $props();
</script>

<div class="w-full space-y-8">
	<h3 class="text-center text-3xl font-bold">{title}</h3>

	<div class="">
		<Carousel.Root
			class="w-full"
			opts={{
				loop: true
			}}
		>
			<Carousel.Content class="-ml-8">
				{#each establecimientos as establecimiento}
					<Carousel.Item class="pl-8 md:basis-1/2 lg:basis-1/3">
						<CardEstablecimiento {establecimiento} />
					</Carousel.Item>
				{/each}
			</Carousel.Content>
			<Carousel.Previous />
			<Carousel.Next />
		</Carousel.Root>
	</div>
</div>
