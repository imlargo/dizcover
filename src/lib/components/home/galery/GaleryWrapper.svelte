<script lang="ts">
	import * as Carousel from '$components/ui/carousel/index.js';
	import { onMount, setContext, type Snippet } from 'svelte';
	import { type CarouselAPI } from '$lib/components/ui/carousel/context.js';
	import GaleryIndicator from '$lib/components/kit/GaleryIndicator.svelte';

	type TipoGaleria = 'establecimiento' | 'evento';

	type Props = {
		title: string;
		tipo: TipoGaleria;
		children: Snippet;
		showTitle?: boolean;
		variant?: 'base' | 'green';
	};

	const { title, tipo, children, showTitle = true, variant = 'base' }: Props = $props();

	type GaleryConfig = {
		tipo: TipoGaleria;
		espaciado: string;
	};

	const mapTipoToSpacing: Record<TipoGaleria, string> = {
		establecimiento: 'pl-8 md:basis-1/2 lg:basis-1/3',
		evento: 'pl-8 md:basis-1/3 lg:basis-1/5'
	};

	const galeryConfig: GaleryConfig = {
		tipo: tipo,
		espaciado: mapTipoToSpacing[tipo]
	};

	setContext('galery-config', galeryConfig);
	let api = $state<CarouselAPI>();
	let current = $state(0);
	let count = $derived(api ? api.scrollSnapList().length : 0);

	$effect(() => {
		if (api) {
			current = api.selectedScrollSnap() + 1;
			api.on('select', () => {
				current = api!.selectedScrollSnap() + 1;
			});
		}
	});
</script>

<div class="w-full space-y-8 overflow-hidden px-0.5">
	{#if showTitle}
		<h3 class="font-display text-center text-3xl">{title}</h3>

		<div class="flex items-center justify-center">
			<GaleryIndicator variant={variant === 'base' ? 'primary' : 'secondary'} />
		</div>
	{/if}

	<div class="">
		<Carousel.Root
			setApi={(emblaApi) => (api = emblaApi)}
			class="w-full"
			opts={{
				loop: true
			}}
		>
			<Carousel.Content class="-ml-8">
				{@render children()}
			</Carousel.Content>
			<Carousel.Previous />
			<Carousel.Next />
		</Carousel.Root>
	</div>
</div>
