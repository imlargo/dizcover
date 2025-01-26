<script lang="ts">
	import Galery from '$lib/components/galery/Galery.svelte';
	import GaleryEvento from '$lib/components/galery/GaleryEvento.svelte';
	import Hero from '$lib/components/home/Hero.svelte';
	import GalerySale from '$lib/components/galery/GalerySale.svelte';
</script>

<Hero />

<div class="mt-12 space-y-24">
	<GalerySale />
	<Galery title="Para ti" />
	<GaleryEvento title="Eventos" />
	<Galery title="Recomendados" />
	<Galery title="Nuevas experiencias" />
</div>
