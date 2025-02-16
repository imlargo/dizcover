<script lang="ts">
	import type { Coordinates } from '$lib/types/establecimiento';

	type Props = {
		coords: Coordinates;
		title: string;
	};

	const { coords, title }: Props = $props();

	const getGoogleMapsLink = (coords: Coordinates): string => {
		const mapsUrl = `https://www.google.com/maps?q=${coords.lat},${coords.lng}`;
		return mapsUrl;
	};

	function getGoogleMapsIframe(coords: Coordinates, zoom = 16) {
		const baseUrl = 'https://www.google.com/maps';
		const queryParams = new URLSearchParams({
			q: `${coords.lat},${coords.lng}`,
			z: zoom.toString(),
			output: 'embed'
		});

		return `${baseUrl}?${queryParams.toString()}`;
	}

	const iframeSrc = getGoogleMapsIframe(coords);
</script>

<div class="relative flex w-full overflow-hidden rounded-md">
	<iframe
		class="w-full"
		title={title}
		width="100%"
		height="600"
		frameborder="0"
		scrolling="no"
		marginheight="0"
		marginwidth="0"
		loading="lazy"
		allowfullscreen
		referrerpolicy="no-referrer-when-downgrade"
		src={iframeSrc}
	></iframe>

	<a
		data-sveltekit-reload
		aria-label="Google Maps link"
		href={getGoogleMapsLink(coords)}
		target="_blank"
		class="absolute right-4 top-4 flex size-12 items-center justify-center rounded-full bg-black"
	>
		<i class="bi bi-geo-alt-fill text-lg leading-none"></i>
	</a>
</div>
