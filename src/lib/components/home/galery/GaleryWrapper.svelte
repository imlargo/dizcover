<script lang="ts">
	import * as Carousel from '$components/ui/carousel/index.js';
	import { setContext, type Snippet } from 'svelte';

	type TipoGaleria = 'establecimiento' | 'evento';

	type Props = {
		title: string;
		tipo: TipoGaleria;
		children: Snippet;
	};

	const { title, tipo, children }: Props = $props();

	type GaleryConfig = {
		tipo: TipoGaleria;
		espaciado: string;
	}
	
	const mapTipoToSpacing: Record<TipoGaleria, string> = {
		'establecimiento': "pl-8 md:basis-1/2 lg:basis-1/3",
		'evento': "pl-8 md:basis-1/2 lg:basis-1/5"
	};

	const galeryConfig: GaleryConfig = {
		tipo: tipo,
		espaciado: mapTipoToSpacing[tipo],
	};

	setContext('galery-config', galeryConfig);
</script>

<div class="w-full space-y-8">
	<h3 class="text-center text-3xl font-display">{title}</h3>

	<div class="">
		<Carousel.Root
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
