<script lang="ts">
    import Galery from "$lib/components/galery/Galery.svelte";
    import GaleryEvento from "$lib/components/galery/GaleryEvento.svelte";
    import Hero from "$lib/components/home/Hero.svelte";
</script>

<Hero />

<div class="space-y-24 mt-24">
        <Galery title="Para ti" />
        <GaleryEvento title="Eventos" />
        <Galery title="Recomendados" />
        <Galery title="Nuevas experiencias" />
</div>