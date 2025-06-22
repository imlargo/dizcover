<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	import { Button } from '$components/ui/button';
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$components/ui/card';
	import { Input } from '$components/ui/input';
	import { Label } from '$components/ui/label';
	import { Textarea } from '$components/ui/textarea';

	import { Badge } from '$components/ui/badge';
	import {
		X,
		Calendar,
		Clock,
		MapPin,
		Users,
		ImageIcon,
		Music,
		Plus,
		Trash2,
		Ticket,
		Upload
	} from '@lucide/svelte';
	import Select from '$lib/components/kit/Select.svelte';
	import { formatCurrency } from '$lib/utils/tools';

	interface SeatingSection {
		id: string;
		name: string;
		price: number;
		capacity: number;
	}

	interface Artist {
		id: string;
		name: string;
		image: File | null;
	}

	const VENUES = [
		'Club Paradise',
		'Discoteca Luna',
		'Bar Central',
		'Terraza Sky',
		'Club Nocturno Elite',
		'Salón de Eventos Royal'
	];

	let eventImages = $state<File[]>([]);
	let seatingSections = $state<SeatingSection[]>([]);
	let artists = $state<Artist[]>([]);
	let newSection = $state({ name: '', price: '', capacity: '' });
	let newArtist = $state({ name: '', image: null as File | null });

	// Manejo de imágenes del evento
	const handleEventImagesUpload = (e: Event) => {
		const files: File[] = Array.from(e?.target?.files || []);
		const imageFiles: File[] = files.filter((file) => file.type.startsWith('image/'));

		if (eventImages.length + imageFiles.length <= 6) {
			eventImages.push(...imageFiles);
		}
	};

	const removeEventImage = (index: number) => {
		eventImages = eventImages.filter((_, i) => i !== index);
	};

	// Manejo de secciones de asientos
	const addSeatingSection = () => {
		if (newSection.name && newSection.price && newSection.capacity) {
			const section: SeatingSection = {
				id: Date.now().toString(),
				name: newSection.name,
				price: Number.parseFloat(newSection.price),
				capacity: Number.parseInt(newSection.capacity)
			};
			seatingSections.push(section);
			newSection = { name: '', price: '', capacity: '' };
		}
	};

	const removeSeatingSection = (id: string) => {
		seatingSections = seatingSections.filter((section) => section.id !== id);
	};

	// Manejo de artistas
	const handleArtistImageUpload = (e: Event) => {
		const file: File = e.target.files?.[0];
		if (file && file.type.startsWith('image/')) {
			newArtist.image = file;
		}
	};

	const addArtist = () => {
		if (newArtist.name) {
			const artist: Artist = {
				id: Date.now().toString(),
				name: newArtist.name,
				image: newArtist.image
			};
			artists.push(artist);
			newArtist = { name: '', image: null };
		}
	};

	const removeArtist = (id: string) => {
		artists = artists.filter((artist) => artist.id !== id);
	};

	const handleSubmit = (e: Event) => {
		e.preventDefault();
		console.log('Evento creado:', {
			eventImages,
			seatingSections,
			artists
		});
	};
	
</script>

<div class="min-h-screen px-4 py-8">
	<div class="mx-auto max-w-4xl">
		<div class="mb-8 text-start">
			<h1 class="mb-2 text-3xl font-bold">Crear Nuevo Evento</h1>
			<p class="text-muted-foreground">Completa todos los detalles para crear tu evento</p>
		</div>

		<form onsubmit={handleSubmit} class="space-y-8">
			<Card>
				<CardHeader>
					<CardTitle class="flex items-center gap-2">
						<Calendar class="h-5 w-5" />
						Información Básica del Evento
					</CardTitle>
					<CardDescription>Detalles fundamentales sobre tu evento</CardDescription>
				</CardHeader>
				<CardContent class="space-y-6">
					<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
						<div class="space-y-2">
							<Label for="event-name">Nombre del Evento *</Label>
							<Input id="event-name" placeholder="Ej: Noche de Reggaeton 2024" required />
						</div>
						<div class="space-y-2">
							<Label for="venue">Establecimiento *</Label>
							<Select
								options={VENUES.map((venue) => ({
									value: venue.toLowerCase().replace(' ', '-'),
									label: venue
								}))}
							/>
						</div>
					</div>

					<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
						<div class="space-y-2">
							<Label for="event-date">Fecha del Evento *</Label>
							<Input id="event-date" type="date" required />
						</div>
						<div class="space-y-2">
							<Label for="event-time">Hora de Inicio *</Label>
							<div class="relative">
								<Clock class="absolute left-3 top-3 h-4 w-4 text-gray-400" />
								<Input id="event-time" type="time" required class="pl-10" />
							</div>
						</div>
						<div class="space-y-2">
							<Label for="reservations">Número de Reservaciones</Label>
							<div class="relative">
								<Users class="absolute left-3 top-3 h-4 w-4 text-gray-400" />
								<Input id="reservations" type="number" placeholder="100" class="pl-10" />
							</div>
						</div>
					</div>

					<div class="space-y-2">
						<Label for="location">Ubicación *</Label>
						<div class="relative">
							<MapPin class="absolute left-3 top-3 h-4 w-4 text-gray-400" />
							<Input
								id="location"
								placeholder="Dirección completa del evento"
								required
								class="pl-10"
							/>
						</div>
					</div>

					<div class="space-y-2">
						<Label for="description">Descripción del Evento</Label>
						<Textarea
							id="description"
							placeholder="Describe el evento, la música, el ambiente y lo que pueden esperar los asistentes..."
							class="min-h-[100px]"
						/>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle class="flex items-center gap-2">
						<Ticket class="h-5 w-5" />
						Distribución de Asientos
					</CardTitle>
					<CardDescription>Configura las secciones y precios para tu evento</CardDescription>
				</CardHeader>
				<CardContent class="space-y-6">
					<div class="rounded-lg border bg-primary-foreground p-4">
						<h3 class="mb-4 text-sm font-medium">Agregar Nueva Sección</h3>
						<div class="grid grid-cols-1 gap-4 md:grid-cols-4">
							<div class="space-y-2">
								<Label class="text-sm text-muted-foreground">Nombre de la Sección</Label>
								<Input placeholder="Ej: VIP, General, Palco" bind:value={newSection.name} />
							</div>
							<div class="space-y-2">
								<Label class="text-sm text-muted-foreground">Precio ($)</Label>
								<Input type="number" placeholder="500" bind:value={newSection.price} />
							</div>
							<div class="space-y-2">
								<Label class="text-sm text-muted-foreground">Capacidad</Label>
								<Input type="number" placeholder="50" bind:value={newSection.capacity} />
							</div>
							<div class="flex items-end">
								<Button type="button" onclick={addSeatingSection} class="w-full">
									<Plus class="mr-1 size-4" />
									Agregar
								</Button>
							</div>
						</div>
					</div>

					{#if seatingSections.length > 0}
						<div class="space-y-4">
							<Label class="text-sm font-medium">Secciones Configuradas</Label>
							<div class="space-y-3">
								{#each seatingSections as section}
									<div class="flex items-center justify-between rounded-lg border p-3">
										<div>
											<div class="font-medium">{section.name}</div>
											<div class="text-sm text-gray-500">
												{section.capacity} asientos • {formatCurrency(section.price)} por boleto
											</div>
										</div>
										<div class="flex items-center gap-2">
											<Badge variant="secondary"
												>${(section.price * section.capacity).toLocaleString()}</Badge
											>
											<Button
												type="button"
												variant="outline"
												size="sm"
												onclick={() => removeSeatingSection(section.id)}
											>
												<Trash2 class="h-4 w-4" />
											</Button>
										</div>
									</div>
								{/each}
							</div>
						</div>
					{/if}
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle class="flex items-center gap-2">
						<Music class="h-5 w-5" />
						Artistas del Evento
					</CardTitle>
					<CardDescription>Agrega los artistas que participarán en tu evento</CardDescription>
				</CardHeader>
				<CardContent class="space-y-6">
					<div class="rounded-lg border bg-primary-foreground p-4">
						<h3 class="mb-4 text-sm font-medium">Agregar Nuevo Artista</h3>
						<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
							<div class="space-y-2">
								<Label class="text-sm text-muted-foreground">Nombre del Artista</Label>
								<Input placeholder="Ej: DJ Snake, Bad Bunny" bind:value={newArtist.name} />
							</div>
							<div class="space-y-2">
								<Label class="text-sm text-muted-foreground">Imagen del Artista</Label>
								<Input type="file" accept="image/*" onchange={handleArtistImageUpload} />
							</div>
							<div class="flex items-end">
								<Button type="button" onclick={addArtist} class="w-full">
									<Plus class="mr-2 h-4 w-4" />
									Agregar Artista
								</Button>
							</div>
						</div>
					</div>

					{#if artists.length > 0}
						<div class="space-y-4">
							<Label class="text-sm font-medium">Artistas Confirmados</Label>
							<div class="grid grid-cols-1 gap-3 md:grid-cols-2">
								{#each artists as artist}
									<div class="flex items-center justify-between rounded-lg border p-3">
										<div class="flex items-center gap-3">
											<div
												class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200"
											>
												<Music class="h-5 w-5 text-gray-500" />
											</div>
											<div>
												<div class="font-medium">{artist.name}</div>
												<div class="text-sm text-gray-500">
													{artist.image ? 'Con imagen' : 'Sin imagen'}
												</div>
											</div>
										</div>
										<Button
											type="button"
											variant="outline"
											size="sm"
											onclick={() => removeArtist(artist.id)}
										>
											<Trash2 class="h-4 w-4" />
										</Button>
									</div>
								{/each}
							</div>
						</div>
					{/if}
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle class="flex items-center gap-2">
						<Upload class="h-5 w-5" />
						Imágenes del Evento
					</CardTitle>
					<CardDescription>Sube hasta 6 imágenes promocionales para tu evento</CardDescription>
				</CardHeader>
				<CardContent class="space-y-6">
					<div class="space-y-2">
						<Label>Imágenes del Evento (Máx 6)</Label>
						<div
							class="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition-colors hover:border-gray-400"
						>
							<div class="space-y-2">
								<ImageIcon class="mx-auto h-8 w-8 text-gray-400" />
								<div>
									<Label
										for="event-images"
										class={`cursor-pointer text-blue-600 hover:text-blue-500 ${
											eventImages.length >= 6 ? 'cursor-not-allowed text-gray-400' : ''
										}`}
									>
										{eventImages.length >= 6
											? 'Límite de imágenes alcanzado'
											: 'Haz clic para subir imágenes del evento'}
									</Label>
									<p class="mt-1 text-xs text-gray-500">
										PNG, JPG hasta 10MB cada una • {eventImages.length}/6 imágenes
									</p>
								</div>
							</div>
							<Input
								id="event-images"
								type="file"
								accept="image/*"
								multiple
								onchange={handleEventImagesUpload}
								class="hidden"
								disabled={eventImages.length >= 6}
							/>
						</div>
					</div>

					{#if eventImages.length > 0}
						<div class="space-y-4">
							<Label class="text-sm font-medium">Imágenes Cargadas ({eventImages.length}/6)</Label>
							<div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
								{#each eventImages as imagen, indice}
									<div class="group relative">
										<div
											class="flex aspect-square items-center justify-center rounded-lg bg-gray-100"
										>
											<img
												src={URL.createObjectURL(imagen)}
												alt={imagen.name}
												class="h-full w-full rounded-lg object-cover"
											/>
										</div>
										<p class="mt-1 truncate text-center text-xs">{imagen.name}</p>
										<Button
											type="button"
											variant="destructive"
											size="sm"
											class="absolute -right-2 -top-2 h-6 w-6 rounded-full p-0 opacity-0 transition-opacity group-hover:opacity-100"
											onclick={() => removeEventImage(indice)}
										>
											<X class="h-3 w-3" />
										</Button>
									</div>
								{/each}
							</div>
						</div>
					{/if}
				</CardContent>
			</Card>

			<div class="flex justify-end space-x-4">
				<Button type="submit" size="lg" class="min-w-[150px]">Crear Evento</Button>
			</div>
		</form>
	</div>
</div>
