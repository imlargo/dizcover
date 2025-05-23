<script lang="ts">
	import { storeAuth } from '$lib/store/auth.svelte';
	import { Calendar, ChevronUp, Clock, Eye, History, Star } from 'lucide-svelte';
	import type { PageData } from './$types';
	import type { Establecimiento } from '$lib/types/establecimiento';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import { Progress } from '$lib/components/ui/progress/index.js';
	import { Button } from '$lib/components/ui/button/index.js';

	let { data }: { data: PageData } = $props();

	const establecimientos = $state<Establecimiento[]>(data.establecimientos);
	const eventos = $state(data.eventos);

	const cupones = [
		{
			image: '/promo.jpg',
			establecimiento: 'Night club bolivar',
			descripcion: 'Six pack cervezas',
			porcentaje: 25
		},
		{
			image: '/promo.jpg',
			establecimiento: 'Night club bolivar',
			descripcion: 'Six pack cervezas',
			porcentaje: 25
		},
		{
			image: '/promo.jpg',
			establecimiento: 'Night club bolivar',
			descripcion: 'Six pack cervezas',
			porcentaje: 25
		},
		{
			image: '/promo.jpg',
			establecimiento: 'Night club bolivar',
			descripcion: 'Six pack cervezas',
			porcentaje: 25
		},
		{
			image: '/promo.jpg',
			establecimiento: 'Night club bolivar',
			descripcion: 'Six pack cervezas',
			porcentaje: 25
		},
		{
			image: '/promo.jpg',
			establecimiento: 'Night club bolivar',
			descripcion: 'Six pack cervezas',
			porcentaje: 25
		}
	];

	function formatDate(date: string) {
		const options: Intl.DateTimeFormatOptions = {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		};
		return new Date(date).toLocaleDateString('es-ES', options);
	}
</script>

<div class="flex flex-col gap-y-8">
	<div class="flex items-center justify-between">
		<h1 class="font-display text-3xl">Bienvenid@, {storeAuth.user?.nombre_usuario}</h1>

		<Button variant="link" class="text-white" href="/dashboard/transacciones">
			<History />
			<span>Historial de trasacciones</span>
		</Button>
	</div>

	<div class="grid grid-cols-2 gap-12">
		<div class="relative flex items-center justify-center rounded-lg bg-primary-foreground p-8">
			<div class="space-y-2 text-center">
				<p class="font-display text-4xl">$3.500.000</p>
				<p class="font-medium text-neutral-400">Total ingresos</p>
			</div>

			<div class="absolute bottom-0 right-0 p-4">
				<span class="flex items-center gap-1 font-bold text-green-500">
					<ChevronUp />
					<span>100%</span>
				</span>
			</div>
		</div>

		<div class="grid grid-cols-2 gap-8 rounded-lg bg-primary-foreground p-8">
			<div class="space-y-2">
				<p class="font-medium text-neutral-400">Ultimas reservas</p>
				<p class="font-display text-3xl">20</p>
			</div>

			<div class="space-y-2">
				<p class="font-medium text-neutral-400">Cupones restantes</p>
				<p class="font-display text-3xl">3</p>
			</div>

			<div class="space-y-2">
				<p class="font-medium text-neutral-400">Total visualizaciones:</p>
				<p class="font-display text-3xl">3.7k</p>
			</div>

			<div class="space-y-2">
				<p class="font-medium text-neutral-400">Total favoritos</p>
				<p class="font-display text-3xl">742</p>
			</div>
		</div>
	</div>

	<div class="space-y-4">
		<h5 class="font-display text-2xl">Establecimientos</h5>
		<div class="space-y-2">
			{#each establecimientos as establecimiento}
				<div class="flex max-h-max justify-between gap-6 rounded-lg bg-primary-foreground p-4">
					<div class="flex items-center gap-6">
						<div class="max-h-min">
							<img
								src={establecimiento.primera_imagen}
								alt={establecimiento.nombre}
								class="block h-[156px] w-72 rounded-lg object-cover"
							/>
						</div>
						<div class="flex max-h-max max-w-max flex-col gap-1">
							<a href="/dashboard/establecimiento/{establecimiento.id}">
								<p class="font-display text-2xl font-semibold">{establecimiento.nombre}</p>
							</a>
							<p class="flex items-center gap-1 text-lg font-bold text-neutral-200">
								<Eye />
								<span>2.5k</span>
							</p>
							<p class="flex items-center gap-1 text-lg text-neutral-200">
								<Star />
								<span>{establecimiento.calificacion_promedio}</span>
							</p>
							<p class="flex items-center gap-1 text-lg text-neutral-200">Calle 123</p>
						</div>
					</div>
					<div class="flex h-full max-w-max flex-col items-baseline justify-end">
						<a
							class="inline-flex rounded-md border border-white px-4 py-2 font-semibold text-white"
							href="/">Publicitar</a
						>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<div class="space-y-4">
		<h5 class="font-display text-2xl">Eventos</h5>
		<div class="space-y-2">
			{#each eventos as evento}
				<div
					class="flex max-h-max flex-col justify-between space-y-2 rounded-lg bg-primary-foreground p-4"
				>
					<div class="flex items-center justify-between">
						<div class="flex items-center justify-between">
							<p class="font-display text-lg">{evento.nombre}</p>
						</div>
						<span>+$400.000</span>
					</div>

					<div class="flex items-center gap-4 text-muted-foreground">
						<div class="flex items-center gap-1">
							<Calendar class="size-4" />
							<span>{formatDate(evento.fecha)}</span>
						</div>
						<div class="flex items-center gap-1">
							<Clock class="size-4" />
							<span>{evento.hora || '-'}</span>
						</div>
					</div>

					<div class="w-full space-y-2">
						<div class="flex items-center justify-end">
							<span>{evento.reservadas || '-'} / {evento.cantidad_reservas}</span>
						</div>
						<Progress
							value={33}
							class="h-2 rounded-full bg-dizcover-primary/20"
							aria-label="Progreso de asistentes al evento"
						/>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<div class="space-y-4 rounded-lg bg-primary-foreground p-4">
		<h2 class="font-semibold text-neutral-400">Cover y reservas</h2>
		<ScrollArea class="h-[200px] w-full">
			{#each cupones as cupon}
				<div class="flex justify-between border-b border-neutral-800 py-3">
					<span>@Juan ha usado {cupon.descripcion}</span>
					<span class="text-neutral-400">Abril 12, 2025</span>
				</div>
			{/each}
		</ScrollArea>
	</div>
</div>
