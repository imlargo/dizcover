<script lang="ts">
	import * as Breadcrumb from '$components/ui/breadcrumb/index.js';
	import { Badge } from '$components/ui/badge/index.js';
	import BentoGalery from '$lib/components/establecimiento/BentoGalery.svelte';
	import Map from '$lib/components/UIKit/Map.svelte';
	import { DatabaseController } from '$lib/services/db';
	import type { Coordinates, Establecimiento } from '$lib/types/establecimiento';
	import type { PageData } from './$types';
	import type { Evento } from '$lib/types/evento';
	import { Button } from '$components/ui/button';

	import GaleryWrapper from '$lib/components/home/galery/GaleryWrapper.svelte';
	import GaleryItem from '$lib/components/home/galery/GaleryItem.svelte';
	import CardEstablecimiento from '$lib/components/home/galery/cards/CardEstablecimiento.svelte';

	let { data }: { data: PageData } = $props();

	const evento: Evento = data.evento as Evento;
	const imagenesEvento = data.imagenes.map((img) => img.imagen);
	
	const getGoogleMapsLink = (coords: Coordinates): string => {
		const mapsUrl = `https://www.google.com/maps?q=${coords?.lat},${coords?.lng}`;
		return mapsUrl;
	};

	const dbController = new DatabaseController();
	let recomendados: Establecimiento[] = $state([]);
	dbController.getEstablecimientos().then((data) => (recomendados = data));

	import Hero from '$lib/components/evento/Hero.svelte';
</script>

<div class="relative h-[90vh] overflow-hidden">
	<img
		src={evento.primera_imagen}
		class="cover-image absolute -z-10 h-full w-full object-cover blur-xl"
		alt={evento.nombre}
	/>

	<div class="flex h-full w-full flex-col justify-between p-12">
		<div class="flex justify-between">
			<Breadcrumb.Root>
				<Breadcrumb.List>
					<Breadcrumb.Item>
						<Breadcrumb.Link class="text-white" href="/">Home</Breadcrumb.Link>
					</Breadcrumb.Item>
					<Breadcrumb.Separator class="text-white" />
					<Breadcrumb.Item>
						<Breadcrumb.Link class="text-white">Evento</Breadcrumb.Link>
					</Breadcrumb.Item>
					<Breadcrumb.Separator class="text-white" />
					<Breadcrumb.Item>
						<Breadcrumb.Page class="text-white">{evento.nombre}</Breadcrumb.Page>
					</Breadcrumb.Item>
				</Breadcrumb.List>
			</Breadcrumb.Root>

			<span
				class="flex items-center justify-center gap-2 rounded-full border border-[#FF0000] bg-[#3C0101] px-6 py-1.5 text-[#FF0000]"
			>
				<span class="size-3 rounded-full bg-[#FF0000]"></span>
				<span>Agotado</span>
			</span>
		</div>

		<div class="flex h-full w-full items-center justify-center">
			<div class="flex px-12">
				<Hero {evento} />
			</div>
		</div>
	</div>
</div>

<main class="space-y-16 p-12">
	<div class="space-y-6">
		<h3 class="text-3xl font-bold">Descripcion</h3>
		<p class="text-lg">{evento.descripcion}</p>
	</div>

	<div class="space-y-6">
		<h3 class="text-3xl font-bold">Galeria</h3>

		<div>
			<BentoGalery images={imagenesEvento} />
		</div>
	</div>

	<div class="space-y-6">
		<h3 class="text-3xl font-bold">Ubicacion</h3>

		<div>
			<Map coords={evento.ubicacion} title={evento.nombre} />
		</div>

		<div class="flex justify-around">
			<Button
				class="px-12 py-8 text-xl "
				variant="secondary"
				href={getGoogleMapsLink(evento.ubicacion)}
				target="_blank">Ir ahora</Button
			>
			<Button class="px-12 py-8 text-xl ">Reservar</Button>
		</div>
	</div>

	<hr />

	<div class="space-y-6">
		<GaleryWrapper title="Recomendados" tipo="establecimiento">
			{#each recomendados as establecimiento}
				<GaleryItem>
					<CardEstablecimiento {establecimiento} />
				</GaleryItem>
			{/each}
		</GaleryWrapper>
	</div>
</main>

<style>
	.cover-image {
		filter: brightness(50%);
	}
</style>
