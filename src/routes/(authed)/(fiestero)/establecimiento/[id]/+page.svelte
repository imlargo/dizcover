<script lang="ts">
	import * as Breadcrumb from '$components/ui/breadcrumb/index.js';
	import { Badge } from '$components/ui/badge/index.js';
	import Events from '$components/establecimiento/Events.svelte';
	import Map from '$lib/components/UIKit/Map.svelte';
	import DialogReserva from '$components/kit/DialogReserva.svelte';
	import { DatabaseController } from '$lib/services/db';
	import type { Coordinates, Establecimiento } from '$lib/types/establecimiento';
	import type { PageData } from './$types';
	import type { Evento } from '$lib/types/evento';
	import { Button } from '$components/ui/button';
	import BentoGalery from '$lib/components/establecimiento/BentoGalery.svelte';
	import * as Tabs from '$lib/components/ui/tabs/index.js';

	import GaleryWrapper from '$lib/components/home/galery/GaleryWrapper.svelte';
	import GaleryItem from '$lib/components/home/galery/GaleryItem.svelte';
	import CardEstablecimiento from '$lib/components/home/galery/cards/CardEstablecimiento.svelte';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import GalerySale from '$lib/components/home/galery/cards/GalerySale.svelte';
	import { MapPin } from 'lucide-svelte';

	let { data }: { data: PageData } = $props();

	const establecimiento: Establecimiento = data.establecimiento as Establecimiento;
	const eventos: Evento[] = data.eventos as Evento[];
	const imagenesEstablecimiento = data.imagenes.map((img) => img.imagen);
	const cordenadas = data.cordenadas.length > 0 ? data.cordenadas[0] : null;
	const cords: Coordinates = {
		lat: cordenadas?.latitud || '',
		lng: cordenadas?.longitud || ''
	};
	const { horarios } = data;

	const getGoogleMapsLink = (coords: Coordinates): string => {
		const mapsUrl = `https://www.google.com/maps?q=${coords?.lat},${coords?.lng}`;
		return mapsUrl;
	};

	const dbController = new DatabaseController();
	let recomendados: Establecimiento[] = $state([]);
	dbController.getEstablecimientos().then((data) => (recomendados = data));

	const parseTime = (time: string) => {
		const [hours, minutes] = time.split(':');
		const hour = parseInt(hours);
		const ampm = hour >= 12 ? 'PM' : 'AM';
		const formattedHour = hour % 12 || 12;
		return `${formattedHour}:${minutes} ${ampm}`;
	};

	const isOpen = $derived.by(() => {
		const today = new Date().getDay();
		const todayHorario = horarios.find((h) => h.dia === today.toString());
		if (!todayHorario) return false;
		const [hours, minutes] = new Date().toLocaleTimeString('en-US', { hour12: false }).split(':');
		const currentTime = parseInt(hours + minutes);
		const openTime = parseInt(todayHorario.hora_apertura.replace(':', ''));
		const closeTime = parseInt(todayHorario.hora_cierre.replace(':', ''));
		return currentTime >= openTime && currentTime <= closeTime;
	});
</script>

<div class="relative h-[90vh]">
	<img
		src={establecimiento.primera_imagen}
		class="absolute -z-10 h-full w-full object-cover"
		alt={establecimiento.nombre}
	/>

	<div class="flex h-full w-full flex-col justify-between px-4 py-12 md:px-10 xl:px-12">
		<div class="flex justify-between">
			<Breadcrumb.Root>
				<Breadcrumb.List>
					<Breadcrumb.Item>
						<Breadcrumb.Link class="text-white hover:text-white/60" href="/">Home</Breadcrumb.Link>
					</Breadcrumb.Item>
					<Breadcrumb.Separator class="text-white" />
					<Breadcrumb.Item>
						<Breadcrumb.Link class="text-white hover:text-white/60">Establecimiento</Breadcrumb.Link
						>
					</Breadcrumb.Item>
					<Breadcrumb.Separator class="text-white" />
					<Breadcrumb.Item>
						<Breadcrumb.Page class="text-white">{establecimiento.nombre}</Breadcrumb.Page>
					</Breadcrumb.Item>
				</Breadcrumb.List>
			</Breadcrumb.Root>

			<div>
				<Popover.Root>
					<Popover.Trigger>
						<span
							class="flex items-center justify-center gap-2 rounded-full border px-6 py-1.5 {isOpen
								? 'border-lime-500 bg-lime-700/10 text-lime-500'
								: 'border-red-500 bg-red-700/10 text-red-500'} "
						>
							<span
								class="size-3 rounded-full"
								class:bg-red-500={!isOpen}
								class:bg-lime-500={isOpen}
							></span>
							<span>{isOpen ? 'Abierto' : 'Cerrado'}</span>
						</span>
					</Popover.Trigger>
					<Popover.Content>
						<div class="flex flex-col gap-1">
							{#each horarios as horario}
								<div class="flex gap-2 hover:bg-neutral-50">
									<span class="font-semibold"
										>{horario.dia.charAt(0).toUpperCase() +
											horario.dia.slice(1).toLowerCase()}:</span
									>
									<span>{parseTime(horario.hora_apertura)} - {parseTime(horario.hora_cierre)}</span>
								</div>
							{/each}
						</div>
					</Popover.Content>
				</Popover.Root>
			</div>
		</div>

		<div class="flex flex-col gap-8">
			<div class="flex items-center gap-4">
				<h5 class="font-display text-6xl">
					{establecimiento.nombre}
				</h5>
				<span class="text-5xl font-bold text-dizcover-primary">
					<i class="bi bi-star-fill"></i>
					<span
						>{typeof establecimiento.calificacion_promedio === 'string'
							? establecimiento.calificacion_promedio
							: establecimiento.calificacion_promedio.toFixed(1)}</span
					>
				</span>
			</div>

			<div class="flex gap-4">
				{#each establecimiento.etiquetas as tag}
					<Badge variant="purple" class="text-base">{tag}</Badge>
				{/each}
			</div>
		</div>
	</div>
</div>

<main class="px-4 py-12 md:px-10 xl:px-12">
	<Tabs.Root value="info" class="w-full space-y-12">
		<Tabs.List class="w-full md:max-w-max">
			<Tabs.Trigger class="w-full" value="info">Info</Tabs.Trigger>
			<Tabs.Trigger class="w-full" value="menu">Menu</Tabs.Trigger>
			<Tabs.Trigger class="w-full" value="reviews">Reviews</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="info">
			<div class="space-y-16">
				<div class="space-y-6">
					<h3 class="font-display text-3xl font-bold">Descripción</h3>
					<p class="text-lg text-muted-foreground">{establecimiento.descripcion}</p>
				</div>

				{#if Array.isArray(data?.cupones?.vigentes) && (data?.cupones?.vigentes || []).length > 0}
					<GalerySale cupones={data.cupones.vigentes} />
				{/if}

				<div class="space-y-6">
					<h3 class="font-display text-3xl font-bold">Galeria</h3>

					<div>
						<BentoGalery images={imagenesEstablecimiento} />
					</div>
				</div>

				<div class="space-y-6">
					<h3 class="text-center text-3xl font-bold">Eventos</h3>
					<div>
						<Events events={eventos.slice(0, 3)} />
					</div>
				</div>

				<div class="space-y-6">
					<div class="flex items-center justify-between">
						<h3 class="font-display text-3xl font-bold">Ubicacion</h3>

						<Button variant="ghost" href={getGoogleMapsLink(cords)} target="_blank">
							<MapPin />
							<span>Ver en maps</span>
						</Button>
					</div>

					<div>
						<Map coords={cords} title={establecimiento.nombre} />
					</div>

					<div class="flex justify-around">
						<DialogReserva />
					</div>
				</div>

				<hr />

				<div class="flex flex-col gap-24">
					<GaleryWrapper title="Recomendados" tipo="establecimiento">
						{#each recomendados as establecimiento}
							<GaleryItem>
								<CardEstablecimiento {establecimiento} />
							</GaleryItem>
						{/each}
					</GaleryWrapper>

					<GaleryWrapper title="Nuevas experiencias" tipo="establecimiento" variant="green">
						{#each recomendados as establecimiento}
							<GaleryItem>
								<CardEstablecimiento variant="green" {establecimiento} />
							</GaleryItem>
						{/each}
					</GaleryWrapper>
				</div>
			</div>
		</Tabs.Content>
		<Tabs.Content value="menu"></Tabs.Content>
		<Tabs.Content value="reviews"></Tabs.Content>
	</Tabs.Root>
</main>

<style>
	img {
		filter: grayscale(100%) brightness(50%);
	}
</style>
