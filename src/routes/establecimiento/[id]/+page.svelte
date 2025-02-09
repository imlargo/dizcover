<script lang="ts">
	import * as Breadcrumb from '$components/ui/breadcrumb/index.js';
	import { Badge } from '$components/ui/badge/index.js';
	import Galery from '$components/establecimiento/Galery.svelte';
	import Events from '$components/establecimiento/Events.svelte';
	import Map from '$components/establecimiento/Map.svelte';
	import GaleryEstablecimientos from '$components/home/galery/Galery.svelte';
	import { DatabaseController } from '$lib/services/db';
	import type { Coordinates, Establecimiento } from '$lib/types/establecimiento';
	import type { PageData } from './$types';
	import type { Evento } from '$lib/types/evento';
	import { Button } from '$components/ui/button';

	let { data }: { data: PageData } = $props();

	const establecimiento: Establecimiento = data.establecimiento as Establecimiento;
	const eventos: Evento[] = data.eventos as Evento[];

	const getGoogleMapsLink = (coords: Coordinates): string => {
		const mapsUrl = `https://www.google.com/maps?q=${coords.lat},${coords.lng}`;
		return mapsUrl;
	};

	const dbController = new DatabaseController();
	let recomendados: Establecimiento[] = $state([])
	dbController.getEstablecimientos().then((data) => (recomendados = data));
</script>

<div class="relative h-[90vh]">
	<img
		src={establecimiento.imagen}
		class="absolute -z-10 h-full w-full object-cover"
		alt={establecimiento.nombre}
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
						<Breadcrumb.Link class="text-white">Establecimiento</Breadcrumb.Link>
					</Breadcrumb.Item>
					<Breadcrumb.Separator class="text-white" />
					<Breadcrumb.Item>
						<Breadcrumb.Page class="text-white">{establecimiento.nombre}</Breadcrumb.Page>
					</Breadcrumb.Item>
				</Breadcrumb.List>
			</Breadcrumb.Root>

			<span class="flex gap-2 items-center justify-center px-6 py-1.5 rounded-full text-[#FF0000] bg-[#3C0101] border border-[#FF0000]">
				<span class="size-3 rounded-full  bg-[#FF0000] "></span>
				<span>Cerrado</span>
			</span>
		</div>

		<div class="flex flex-col gap-8">
			<div class="flex gap-4">
				<h5 class="text-6xl font-bold">
					<span>{establecimiento.nombre}</span>
					<span class="text-[#D400FE]">
						<i class="bi bi-star-fill"></i>
						<span>{establecimiento.score}</span>
					</span>
				</h5>
			</div>

			<div class="flex gap-4">
				{#each establecimiento.tags as tag}
					<Badge variant="purple">{tag}</Badge>
				{/each}
			</div>
		</div>
	</div>
</div>

<main class="space-y-16 p-12">
	<div class="space-y-6">
		<h3 class="text-3xl font-bold">Descripcion</h3>
		<p class="text-lg">{establecimiento.description}</p>
	</div>

	<div class="space-y-6">
		<h3 class="text-3xl font-bold">Galeria</h3>

		<div>
			<Galery images={establecimiento.imagenes} />
		</div>
	</div>

	<div class="space-y-6">
		<h3 class="text-center text-3xl font-bold">Eventos</h3>
		<div>
			<Events events={eventos.slice(0, 3)} />
		</div>
	</div>

	<div class="space-y-6">
		<h3 class="text-3xl font-bold">Ubicacion</h3>

		<div>
			<Map {establecimiento} />
		</div>

		<div class="flex justify-around">
			<Button
				class="px-12 py-8 text-xl "
				variant="secondary"
				href={getGoogleMapsLink(establecimiento.ubicacion)}
				target="_blank">Ir ahora</Button
			>
			<Button class="px-12 py-8 text-xl ">Reservar</Button>
		</div>
	</div>


	<hr>

	<div class="space-y-6">
		<GaleryEstablecimientos title="Recomendados" establecimientos={recomendados} />
	</div>
</main>

<style>
	img {
		filter: grayscale(100%) brightness(50%);
	}
</style>
