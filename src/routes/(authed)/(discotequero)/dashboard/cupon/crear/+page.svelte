<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	import { Button } from '$components/ui/button';
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$components/ui/card';
	import { Input } from '$components/ui/input';
	import { Label } from '$components/ui/label';
	import { Textarea } from '$components/ui/textarea';
	import Select from '$lib/components/kit/Select.svelte';
	import { Percent, Users, ImageIcon, DollarSign, Ticket, Info, Hash } from '@lucide/svelte';
	import { formatCurrency } from '$lib/utils/tools';

	const ESTABLISHMENTS = [
		'Club Paradise',
		'Discoteca Luna',
		'Bar Central',
		'Terraza Sky',
		'Club Nocturno Elite',
		'Salón de Eventos Royal'
	];

	const PRODUCTS = [
		'Entrada General',
		'Entrada VIP',
		'Mesa para 4 personas',
		'Mesa para 6 personas',
		'Botella de Whisky',
		'Botella de Vodka',
		'Botella de Ron',
		'Cóctel Premium',
		'Cerveza Nacional',
		'Cerveza Importada',
		'Paquete de Bebidas',
		'Servicio de Mesero'
	];

	let couponImage = $state<File | null>(null);
	let discountPercentage = $state('');
	let originalPrice = $state('');
	let totalCoupons = $state('');

	const handleImageUpload = (e: Event) => {
		const file: File = e.target.files?.[0];
		if (file && file.type.startsWith('image/')) {
			couponImage = file;
		}
	};

	const handleSubmit = (e: Event) => {
		e.preventDefault();
		console.log('Cupón creado:', {
			couponImage,
			discountPercentage,
			originalPrice,
			totalCoupons
		});
	};

	const discountedPrice = $derived.by(() => {
		if (originalPrice && discountPercentage) {
			const price = Number.parseFloat(originalPrice);
			const discount = Number.parseFloat(discountPercentage);
			return price - (price * discount) / 100;
		}
		return 0;
	});
</script>

<div class="min-h-screen px-4 py-8">
	<div class="mx-auto max-w-4xl">
		<div class="mb-8">
			<h1 class="mb-2 text-3xl font-bold">Crear Nuevo Cupón</h1>
			<p class="text-muted-foreground">Configura un cupón de descuento para tu establecimiento</p>
		</div>

		<form onsubmit={handleSubmit} class="space-y-8">
			<Card>
				<CardHeader>
					<CardTitle class="flex items-center gap-2">
						<Ticket class="h-5 w-5" />
						Información del Cupón
					</CardTitle>
					<CardDescription>Configura todos los detalles del cupón de descuento</CardDescription>
				</CardHeader>
				<CardContent class="space-y-6">
					<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
						<div class="space-y-2">
							<Label for="establishment">Establecimiento *</Label>
							<Select
								options={ESTABLISHMENTS.map((op) => ({
									label: op,
									value: op.toLowerCase().replace(' ', '-')
								}))}
							/>
						</div>
						<div class="space-y-2">
							<Label for="product-name">Nombre del Producto con Descuento *</Label>
							<Input
								id="product-name"
								placeholder="Ej: Entrada VIP con 50% de descuento"
								required
							/>
						</div>
					</div>

					<div class="space-y-2">
						<Label for="product">Producto *</Label>
						<Select
							options={PRODUCTS.map((op) => ({
								label: op,
								value: op.toLowerCase().replace(' ', '-')
							}))}
						/>
					</div>

					<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
						<div class="space-y-2">
							<Label for="discount-percentage">Porcentaje de Descuento (%) *</Label>
							<div class="relative">
								<Percent class="absolute left-3 top-3 h-4 w-4 text-gray-400" />
								<Input
									id="discount-percentage"
									type="number"
									min="1"
									max="100"
									placeholder="25"
									bind:value={discountPercentage}
									class="pl-10"
									required
								/>
							</div>
						</div>
						<div class="space-y-2">
							<Label for="original-price">Precio Sin Descuento ($) *</Label>
							<div class="relative">
								<DollarSign class="absolute left-3 top-3 h-4 w-4 text-gray-400" />
								<Input
									id="original-price"
									type="number"
									min="0"
									step="0.01"
									placeholder="100.00"
									bind:value={originalPrice}
									class="pl-10"
									required
								/>
							</div>
						</div>
					</div>

					{#if discountedPrice > 0}
						<div class="rounded-lg border border-primary-foreground bg-primary-foreground p-4">
							<div class="mb-2 flex items-center gap-2">
								<Info class="size-4 " />
								<span class="font-medium">Vista Previa del Descuento</span>
							</div>
							<div class="grid grid-cols-1 gap-4 text-center md:grid-cols-3">
								<div>
									<div class="text-sm text-muted-foreground">Precio Original</div>
									<div class="text-lg font-semibold text-gray-800 line-through">
										{formatCurrency(originalPrice)}
									</div>
								</div>
								<div>
									<div class="text-sm text-muted-foreground">Descuento</div>
									<div class="text-lg font-semibold text-green-600">-{discountPercentage}%</div>
								</div>
								<div>
									<div class="text-sm text-muted-foreground">Precio Final</div>
									<div class="text-lg font-semibold">
										{formatCurrency(discountedPrice)}
									</div>
								</div>
							</div>
						</div>
					{/if}

					<div class="space-y-2">
						<Label for="description">Descripción del Cupón</Label>
						<Textarea
							id="description"
							placeholder="Describe las condiciones, beneficios y términos del cupón..."
							class="min-h-[100px]"
						/>
					</div>

					<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
						<div class="space-y-2">
							<Label for="min-people">Mínimo de Personas *</Label>
							<div class="relative">
								<Users class="absolute left-3 top-3 h-4 w-4 text-gray-400" />
								<Input
									id="min-people"
									type="number"
									min="1"
									placeholder="2"
									class="pl-10"
									required
								/>
							</div>
						</div>
						<div class="space-y-2">
							<Label for="validity-date">Día de Validez *</Label>
							<Input id="validity-date" type="date" required />
						</div>
						<div class="space-y-2">
							<Label for="total-coupons">Cantidad Total de Cupones *</Label>
							<div class="relative">
								<Hash class="absolute left-3 top-3 h-4 w-4 text-gray-400" />
								<Input
									id="total-coupons"
									type="number"
									min="1"
									placeholder="100"
									bind:value={totalCoupons}
									class="pl-10"
									required
								/>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle class="flex items-center gap-2">
						<ImageIcon class="h-5 w-5" />
						Imagen del Cupón
					</CardTitle>
					<CardDescription
						>Sube una imagen representativa del cupón (opcional pero recomendable)</CardDescription
					>
				</CardHeader>
				<CardContent class="space-y-6">
					<div class="space-y-2">
						<Label>Imagen del Cupón</Label>
						<div
							class="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition-colors hover:border-gray-400"
						>
							{#if couponImage}
								<div class="space-y-2">
									<ImageIcon class="mx-auto h-8 w-8 text-green-600" />
									<p class="text-sm font-medium text-green-600">{couponImage.name}</p>
									<Button
										type="button"
										variant="outline"
										size="sm"
										onclick={() => (couponImage = null)}
									>
										Eliminar
									</Button>
								</div>
							{:else}
								<div class="space-y-2">
									<ImageIcon class="mx-auto h-8 w-8 text-gray-400" />
									<div>
										<Label
											for="coupon-image"
											class="cursor-pointer text-blue-600 hover:text-blue-500"
										>
											Haz clic para subir imagen del cupón
										</Label>
										<p class="mt-1 text-xs text-gray-500">PNG, JPG hasta 10MB</p>
									</div>
								</div>
							{/if}

							<Input
								id="coupon-image"
								type="file"
								accept="image/*"
								onchange={handleImageUpload}
								class="hidden"
							/>
						</div>
					</div>
				</CardContent>
			</Card>

			<div class="flex justify-end space-x-4">
				<Button type="submit" size="lg" class="min-w-[150px]">Crear Cupón</Button>
			</div>
		</form>
	</div>
</div>
