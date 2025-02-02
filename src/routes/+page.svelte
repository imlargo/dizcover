<script lang="ts">
	import Galery from '$components/home/galery/Galery.svelte';
	import GaleryEvento from '$components/home/galery/GaleryEvento.svelte';
	import Hero from '$components/home/Hero.svelte';
	import GalerySale from '$components/home/galery/GalerySale.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const { establecimientos, eventos } = data;
</script>

<Hero />

<div class="mt-12 space-y-24">
	<GalerySale />
	<Galery {establecimientos} title="Para ti" />
	<GaleryEvento {eventos} title="Eventos" />
	<Galery {establecimientos} title="Recomendados" />
	<Galery {establecimientos} title="Nuevas experiencias" />
</div>
