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
			16
		);

		L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 21,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		}).addTo(map);

        const locations = [
            { lat: 6.2095588, lng: -75.5659474, nombre: "Establecimiento 1" },
            { lat: 6.2097457, lng: -75.5659753, nombre: "Establecimiento 2" },
            { lat: 6.2108964, lng: -75.5711483, nombre: "Establecimiento 3" },
        ]

        const marketIcon = L.icon({
            iconUrl: 'marker.svg',
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40]
        });

        for (const location of locations) {
            const marker = L.marker([location.lat, location.lng], {
                icon: marketIcon
            }).addTo(map);
            marker.bindPopup(location.nombre).openPopup();
        }
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
	<div class="map" bind:this={mapElement}></div>
</main>

<style>
	.map {
		height: 100svh;
		width: 100vw;
	}
</style>
