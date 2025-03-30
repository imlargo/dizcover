<script lang="ts">
	import type { PageData } from './$types';

	import { storeLocation } from '$lib/store/location.svelte';
	import { onMount } from 'svelte';

	let { data }: { data: PageData } = $props();

	let map: L.Map;
	let mapElement: HTMLDivElement;

	async function initMap(element: HTMLDivElement) {
		console.log('initMap', element, storeLocation.location);

		const L = await import('leaflet');

		map = L.map(element).setView(
			[storeLocation.location.lat as number, storeLocation.location.lng as number],
			13
		);

		L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		}).addTo(map);
	}

	onMount(() => {
		storeLocation.requestLocation();
	});

	$effect(() => {
		if (storeLocation.autorization && window) {
			initMap(mapElement);
		}
	});
</script>

<main>
	<button onclick={storeLocation.requestLocation}>Location</button>
	<div class="map" bind:this={mapElement}></div>
</main>

<style>
	.map {
		height: 100svh;
		width: 100vw;
	}
</style>
