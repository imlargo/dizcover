<script lang="ts">
	import type { PageData } from './$types';
	import { storeLocation } from '$lib/store/location.svelte';
	import Map from '$lib/components/UIKit/Map.svelte';

	let { data }: { data: PageData } = $props();

	function handleRequest() {
		storeLocation.requestLocation();
	}

    function handleRequestWatch() {
        storeLocation.startWatch();
    }
</script>

<div class="flex flex-col items-center justify-center gap-4 py-24">
	<button class="rounded border px-4 py-4" onclick={handleRequest}>Solicitar</button>
	<button class="rounded border px-4 py-4" onclick={handleRequestWatch}>Rastrear</button>

	<div>
		<p>Esta autorizado: {storeLocation.autorization}</p>

		<p>Ubicacion actual:</p>
		<p>Latitud: {storeLocation.location.lat}</p>
		<p>Longitud: {storeLocation.location.lng}</p>
	</div>
</div>
