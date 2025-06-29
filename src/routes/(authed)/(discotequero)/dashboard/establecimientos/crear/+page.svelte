<script lang="ts">
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card/index.js';
	import {
		Clock,
		FileText,
		Image,
		Mail,
		MapPin,
		Phone,
		Tag as TagIcon,
		Upload,
		X
	} from 'lucide-svelte';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import SuperSelect from '$lib/components/kit/Select.svelte';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import StarRate from '$lib/components/reviews/StarRate.svelte';
	import type { Establecimiento } from '$lib/types/establecimiento';
	import { onMount } from 'svelte';
	import type { Tag } from '$lib/types/models/tag';
	import { TagsController } from '$lib/controllers/tags';
	import { toast } from 'svelte-sonner';
	import { EstablecimientoController } from '$lib/controllers/establecimiento';
	import { Loader2 } from '@lucide/svelte';

	let { data }: { data: PageData } = $props();

	type FormData = {
		id_discotequero: number;
		nombre: string;
		direccion: string;
		email: string;
		departamento: string;
		municipio: string;
		descripcion: string;
	};

	const formData = $state<FormData>({
		id_discotequero: '' as unknown as number,
		nombre: '',
		direccion: '',
		email: '',
		departamento: '',
		municipio: '',
		descripcion: ''
	});

	const operatingHours = $state<
		Record<string, { isOpen: boolean; openTime: string; closeTime: string }>
	>({});

	let selectedTags = $state<Tag[]>([]);
	let selectedTagsIds = $derived<number[]>(Array.from(new Set(selectedTags.map((tag) => tag.id))));
	let mainImage = $state<File | null>(null);
	let galleryImages = $state<File[]>([]);
	let menuPdf = $state<File | null>(null);
	let isLoading = $state<boolean>(false);
	let isSuccess = $state<boolean>(false);

	let availableTags = $state<Tag[]>(data.tags || []);

	const DAYS_OF_WEEK = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

	function handleTagToggle(tag: Tag) {
		if (selectedTagsIds.includes(tag.id)) {
			selectedTags = selectedTags.filter((t) => t.id !== tag.id);
		} else {
			if (selectedTags.length == 5) {
				toast.info('Solo puedes seleccionar hasta 5 etiquetas.');
				return;
			}

			selectedTags.push(tag);
		}
	}

	function handleMainImageUpload(e: Event) {
		const file = e.target.files?.[0];
		if (file && file.type.startsWith('image/')) {
			mainImage = file;
		}
	}

	function handleGalleryImageUpload(e: Event) {
		const files: File[] = Array.from(e.target.files || []);
		const imageFiles: File[] = files.filter((file) => file.type.startsWith('image/'));

		if (galleryImages.length + imageFiles.length <= 10) {
			galleryImages = [...galleryImages, ...imageFiles];
		}
	}

	function removeGalleryImage(index: number) {
		galleryImages = galleryImages.filter((_, i) => i !== index);
	}

	function handleMenuUpload(e: Event) {
		const file = e.target.files?.[0];
		if (file && file.type === 'application/pdf') {
			menuPdf = file;
		}
	}

	const discotequerosOptions = $derived(
		data.discotequeros.map((d) => ({
			value: d.id,
			label: d.nombre_empresarial
		}))
	);

	const establecimientoController = new EstablecimientoController();
	async function handleSubmit() {
		isLoading = true;
		// Validar campos obligatorios
		if (Object.values(formData).some((value) => !value)) {
			toast.error('Por favor, completa todos los campos obligatorios.');
			return;
		}

		toast.loading('Creando establecimiento...');
		const establecimiento = await establecimientoController.createEstablecimiento(formData);

		// Validar horarios
		const horarios: Record<string, { hora_apertura: string; hora_cierre: string }> = {};
		for (const day in operatingHours) {
			const { isOpen, openTime, closeTime } = operatingHours[day];
			if (isOpen) {
				if (!openTime || !closeTime) {
					toast.error(`Por favor, completa el horario de ${day}.`);
					return;
				}
				horarios[day] = { hora_apertura: openTime, hora_cierre: closeTime };
			}
		}

		if (Object.keys(horarios).length === 0) {
			toast.error('Por favor, selecciona al menos un día con horario de apertura.');
			return;
		}

		toast.loading('Guardando horarios...');
		await establecimientoController.createHorarioEstablecimiento(
			establecimiento.id as unknown as number,
			horarios
		);

		// Validar etiquetas
		if (selectedTags.length < 3) {
			toast.error('Por favor, selecciona al menos 3 etiquetas.');
			return;
		}

		toast.loading('Guardando etiquetas...');
		await establecimientoController.createEtiquetasEstablecimiento(
			establecimiento.id as unknown as number,
			selectedTags.map((tag) => tag.id)
		);

		// Imagenes
		if (!mainImage) {
			toast.error('Por favor, sube una imagen principal.');
			return;
		}

		if (galleryImages.length == 1) {
			toast.error('Por favor, sube al menos una imagen de galería.');
			return;
		}

		if (galleryImages.length > 5) {
			toast.error('Solo puedes subir hasta 5 imágenes de galería.');
			return;
		}

		toast.loading('Subiendo imágenes...');
		const images = [mainImage, ...galleryImages];
		await establecimientoController.createImagenesEstablecimiento(
			establecimiento.id as unknown as number,
			images
		);

		isLoading = false;
		toast.success('Establecimiento creado exitosamente!.');
	}
</script>

<div class="min-h-screen px-4 py-8">
	<div class="mx-auto max-w-4xl">
		<div class="mb-8">
			<h1 class="mb-2 text-3xl font-bold">Crear Establecimiento</h1>
			<p class="text-muted-foreground">
				Completa los detalles para agregar tu discoteca a nuestra plataforma
			</p>
		</div>

		{JSON.stringify(formData, null, 2)}

		<hr />

		<hr />

		<Card.Root>
			<Card.Header>
				<Card.Title class="flex items-center gap-2">
					<MapPin class="h-5 w-5" />
					Información Básica
				</Card.Title>
				<Card.Description>Ingresa los datos fundamentales de tu discoteca</Card.Description>
			</Card.Header>
			<Card.Content class="space-y-6">
				<div class="space-y-2">
					<Label for="name">Discotequero *</Label>
					<SuperSelect
						bind:value={formData.id_discotequero}
						placeholder="Seleccione el discotequero"
						options={discotequerosOptions}
					/>
				</div>

				<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
					<div class="space-y-2">
						<Label for="name">Nombre del Establecimiento *</Label>
						<Input
							bind:value={formData.nombre}
							id="name"
							placeholder="Ingresa el nombre de la discoteca"
							required
						/>
					</div>
					<div class="space-y-2">
						<Label for="phone">Número de Teléfono *</Label>
						<div class="relative">
							<Phone class="absolute left-3 top-3 h-4 w-4 text-gray-400" />
							<Input id="phone" type="tel" placeholder="+57 1234567" class="pl-10" required />
						</div>
					</div>
				</div>

				<div class="space-y-2">
					<Label for="address">Dirección *</Label>
					<Input
						bind:value={formData.direccion}
						id="address"
						placeholder="Ingresa la dirección completa"
						required
					/>
				</div>

				<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
					<div class="space-y-2">
						<Label for="latitude">Latitud</Label>
						<Input id="latitude" type="number" step="any" placeholder="40.7128" />
					</div>
					<div class="space-y-2">
						<Label for="longitude">Longitud</Label>
						<Input id="longitude" type="number" step="any" placeholder="-74.0060" />
					</div>
					<div class="space-y-2">
						<Label for="email">Correo Electrónico</Label>
						<div class="relative">
							<Mail class="absolute left-3 top-3 h-4 w-4 text-gray-400" />
							<Input
								bind:value={formData.email}
								id="email"
								type="email"
								placeholder="contacto@discoteca.com"
								class="pl-10"
							/>
						</div>
					</div>
				</div>

				<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
					<div class="space-y-2">
						<Label for="state">Departamento *</Label>
						<Input id="state" type="text" bind:value={formData.departamento} />
					</div>
					<div class="space-y-2">
						<Label for="municipality">Municipio *</Label>
						<Input id="municipality" type="text" bind:value={formData.municipio} />
					</div>
				</div>

				<div class="space-y-2">
					<Label for="description">Descripción</Label>
					<Textarea
						bind:value={formData.descripcion}
						id="description"
						placeholder="Describe tu discoteca, el ambiente y lo que la hace especial..."
						class="min-h-[100px]"
					/>
				</div>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header>
				<Card.Title class="flex items-center gap-2">
					<Clock class="h-5 w-5" />
					Horarios de Funcionamiento
				</Card.Title>
				<Card.Description>
					Establece el horario de operación de tu discoteca para cada día de la semana
				</Card.Description>
			</Card.Header>
			<Card.Content>
				<div class="space-y-4">
					{#each DAYS_OF_WEEK as day}
						<div class="flex items-center gap-4 rounded-lg border p-4">
							<div class="flex min-w-[120px] items-center space-x-2">
								<Checkbox
									id={`${day}-open`}
									checked={operatingHours[day]?.isOpen}
									onCheckedChange={(checked) => {
										operatingHours[day] = {
											isOpen: checked,
											openTime: checked ? '00:00' : '',
											closeTime: checked ? '01:00' : ''
										};
									}}
								/>
								<Label for={`${day}-open`} class="font-medium">
									{day}
								</Label>
							</div>

							{#if operatingHours[day]?.isOpen}
								<div class="flex flex-1 items-center gap-2">
									<Input type="time" bind:value={operatingHours[day].openTime} class="w-32" />
									<span class="text-gray-500">a</span>
									<Input type="time" bind:value={operatingHours[day].closeTime} class="w-32" />
								</div>
							{/if}

							{#if !operatingHours[day]?.isOpen}
								<span class="italic text-gray-500">Cerrado</span>
							{/if}
						</div>
					{/each}
				</div>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header>
				<Card.Title class="flex items-center gap-2">
					<TagIcon class="h-5 w-5" />
					Etiquetas y Características
				</Card.Title>
				<Card.Description>
					Selecciona etiquetas que describan las características y ambiente de tu discoteca
				</Card.Description>
			</Card.Header>
			<Card.Content>
				<div class="space-y-4">
					<div class="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
						{#each availableTags as tag}
							<div class="flex items-center space-x-2">
								<Checkbox
									id={'tag-' + tag.id}
									checked={selectedTagsIds.includes(tag.id)}
									onCheckedChange={() => handleTagToggle(tag)}
								/>
								<Label for={'tag-' + tag.id} class="cursor-pointer text-sm font-normal">
									{tag.nombre}
								</Label>
							</div>
						{/each}
					</div>

					{#if selectedTags.length > 0}
						<div class="mt-4">
							<Label class="text-sm font-medium">Etiquetas Seleccionadas:</Label>
							<div class="mt-2 flex flex-wrap gap-2">
								{#each selectedTags as tag (tag.id)}
									<Badge
										variant="secondary"
										class="cursor-pointer"
										onclick={() => handleTagToggle(tag)}
									>
										{tag.nombre}
										<X class="ml-1 h-3 w-3" />
									</Badge>
								{/each}
							</div>
						</div>
					{/if}
				</div>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header>
				<Card.Title class="flex items-center gap-2">
					<Upload class="h-5 w-5" />
					Medios y Documentos
				</Card.Title>
				<Card.Description
					>Sube la imagen principal, fotos de galería y menú de tu discoteca</Card.Description
				>
			</Card.Header>
			<Card.Content class="space-y-6">
				<div class="space-y-2">
					<Label>Imagen Principal *</Label>
					<div
						class="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition-colors hover:border-gray-400"
					>
						{#if mainImage}
							<div class="space-y-2">
								<Image class="mx-auto h-8 w-8 text-dizcover-primary" />
								<p class="text-sm font-medium text-dizcover-primary">{mainImage.name}</p>
								<Button
									type="button"
									variant="outline"
									size="sm"
									onclick={() => (mainImage = null)}
								>
									Eliminar
								</Button>
							</div>
						{:else}
							<div class="space-y-2">
								<Image class="mx-auto h-8 w-8 text-gray-400" />
								<div>
									<Label for="main-image" class="cursor-pointer text-blue-600 hover:text-blue-500">
										Haz clic para subir imagen principal
									</Label>
									<p class="mt-1 text-xs text-gray-500">PNG, JPG hasta 10MB</p>
								</div>
							</div>
						{/if}

						<Input
							id="main-image"
							type="file"
							accept="image/*"
							onchange={handleMainImageUpload}
							class="hidden"
						/>
					</div>
				</div>

				<Separator />

				<div class="space-y-2">
					<Label>Galería de Imágenes (Máx 5)</Label>
					<div
						class="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition-colors hover:border-gray-400"
					>
						<div class="space-y-2">
							<Image class="mx-auto h-8 w-8 text-gray-400" />
							<div>
								<Label for="gallery-images" class="cursor-pointer">
									Haz clic para subir imágenes de galería
								</Label>
								<p class="mt-1 text-xs text-gray-500">PNG, JPG hasta 10MB cada una</p>
							</div>
						</div>
						<Input
							id="gallery-images"
							type="file"
							accept="image/*"
							multiple
							onchange={handleGalleryImageUpload}
							class="hidden"
							disabled={galleryImages.length >= 5}
						/>
					</div>

					{#if galleryImages.length > 0}
						<div class="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
							{#each galleryImages as file, index (index)}
								<div class="group relative">
									<div
										class="flex aspect-square items-center justify-center rounded-lg bg-gray-100"
									>
										{#if file.type.startsWith('image/')}
											<img
												src={URL.createObjectURL(file)}
												alt={file.name}
												class="h-full w-full rounded-lg object-cover"
											/>
										{:else}
											<FileText class="h-8 w-8 text-gray-400" />
										{/if}
									</div>
									<p class="mt-1 truncate text-center text-xs">{file.name}</p>
									<Button
										type="button"
										variant="destructive"
										size="sm"
										class="absolute -right-2 -top-2 h-6 w-6 rounded-full p-0 opacity-0 transition-opacity group-hover:opacity-100"
										onclick={() => removeGalleryImage(index)}
									>
										<X class="h-3 w-3" />
									</Button>
								</div>
							{/each}
						</div>
					{/if}
				</div>

				<Separator />

				<div class="space-y-2">
					<Label>Menú (PDF)</Label>

					<div
						class="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition-colors hover:border-gray-400"
					>
						{#if menuPdf}
							<div class="space-y-2">
								<FileText class="mx-auto h-8 w-8 text-dizcover-primary" />
								<p class="text-sm font-medium text-dizcover-primary">{menuPdf.name}</p>
								<Button type="button" variant="outline" size="sm" onclick={() => (menuPdf = null)}>
									Eliminar
								</Button>
							</div>
						{:else}
							<div class="space-y-2">
								<FileText class="mx-auto h-8 w-8 text-gray-400" />
								<div>
									<Label for="menu-pdf" class="cursor-pointer text-blue-600 hover:text-blue-500">
										Haz clic para subir menú PDF
									</Label>
									<p class="mt-1 text-xs text-gray-500">PDF hasta 10MB</p>
								</div>
							</div>
						{/if}
						<Input
							id="menu-pdf"
							type="file"
							accept=".pdf"
							onchange={handleMenuUpload}
							class="hidden"
						/>
					</div>
				</div>
			</Card.Content>
		</Card.Root>

		<div class="flex justify-end space-x-4">
			<Button disabled={isLoading} onclick={handleSubmit} size="lg" class="w-full">
				{#if isLoading}
					<Loader2 class="size-4 animate-spin" />
					<span>Creando...</span>
				{:else}
					Crear
				{/if}
			</Button>
		</div>
	</div>
</div>
