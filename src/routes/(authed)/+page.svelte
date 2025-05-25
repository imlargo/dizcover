<script lang="ts">
	import type { PageData } from './$types';
	import Hero from '$components/home/Hero.svelte';
	import GalerySale from '$lib/components/home/galery/cards/GalerySale.svelte';
	import GaleryWrapper from '$lib/components/home/galery/GaleryWrapper.svelte';
	import GaleryItem from '$lib/components/home/galery/GaleryItem.svelte';
	import CardEstablecimiento from '$lib/components/home/galery/cards/CardEstablecimiento.svelte';
	import CardEvento from '$lib/components/home/galery/cards/CardEvento.svelte';

	let { data }: { data: PageData } = $props();
	const { establecimientos, eventos } = data;

	const featuredEstablecimiento =
		establecimientos[Math.floor(Math.random() * establecimientos.length)];
</script>

<Hero establecimiento={featuredEstablecimiento} />

<div class="mt-12 space-y-24">
	<GalerySale />

	<GaleryWrapper title="Para ti" tipo="establecimiento">
		{#each establecimientos as establecimiento}
			<GaleryItem>
				<CardEstablecimiento {establecimiento} />
			</GaleryItem>
		{/each}
	</GaleryWrapper>

	<GaleryWrapper title="Eventos" tipo="evento">
		{#each eventos as evento}
			<GaleryItem>
				<CardEvento {evento} />
			</GaleryItem>
		{/each}
	</GaleryWrapper>

	<GaleryWrapper title="Recomendados" tipo="establecimiento">
		{#each establecimientos as establecimiento}
			<GaleryItem>
				<CardEstablecimiento {establecimiento} />
			</GaleryItem>
		{/each}
	</GaleryWrapper>

	<GaleryWrapper title="Nuevas experiencias" tipo="establecimiento" variant="secondary">
		{#each establecimientos as establecimiento}
			<GaleryItem>
				<CardEstablecimiento variant="secondary" {establecimiento} />
			</GaleryItem>
		{/each}
	</GaleryWrapper>
</div>
