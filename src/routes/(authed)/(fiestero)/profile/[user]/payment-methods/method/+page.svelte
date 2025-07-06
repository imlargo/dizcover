<script lang="ts">
	import type { PageData } from './$types';
	import { Input } from '$lib/components/ui/input/index.js';

	let { data }: { data: PageData } = $props();

	type PaymentMethod = {
		cardType: string;
		cardNumber: string;
		expirationDate: string;
		securityCode: string;
		firstName: string;
		lastName: string;
		address: string;
		postalCode: string;
		city: string;
		department: string;
		country: string;
		phone: string;
	};

	type Field = {
		label: string;
		field: keyof PaymentMethod;
		type: 'text' | 'password' | 'email' | 'date';
	};

	const fields: Field[] = [
		{
			label: 'Tipo de tarjeta',
			field: 'cardType',
			type: 'text'
		},
		{
			label: 'Número de tarjeta',
			field: 'cardNumber',
			type: 'password'
		},
		{
			label: 'Fecha de vencimiento',
			field: 'expirationDate',
			type: 'date'
		},
		{
			label: 'Código de seguridad',
			field: 'securityCode',
			type: 'password'
		},
		{
			label: 'Nombres',
			field: 'firstName',
			type: 'text'
		},
		{
			label: 'Apellidos',
			field: 'lastName',
			type: 'text'
		},
		{
			label: 'Dirección',
			field: 'address',
			type: 'text'
		},
		{
			label: 'Código postal',
			field: 'postalCode',
			type: 'text'
		},
		{
			label: 'Ciudad',
			field: 'city',
			type: 'text'
		},
		{
			label: 'Departamento',
			field: 'department',
			type: 'text'
		},
		{
			label: 'País',
			field: 'country',
			type: 'text'
		},
		{
			label: 'Celular',
			field: 'phone',
			type: 'text'
		}
	];

	const paymentMethod: PaymentMethod = {
		cardType: '',
		cardNumber: '',
		expirationDate: '',
		securityCode: '',
		firstName: '',
		lastName: '',
		address: '',
		postalCode: '',
		city: '',
		department: '',
		country: '',
		phone: ''
	};
</script>

<div class="flex flex-col gap-8">
	<h3 class="font-display text-3xl font-bold">Mi perfil</h3>

	<div class="flex flex-col gap-1">
		<div class="flex flex-col gap-2 rounded-lg bg-neutral-900 p-4">
			<div class="h-16 w-28 overflow-hidden rounded-lg border">
				<img class="h-16 w-28" src="" alt={paymentMethod.cardType} />
			</div>

			<span class="text-lg font-semibold">VISA</span>
			<span class="text-neutral-400">*** *** ***333</span>
		</div>

		<div class="grid grid-cols-1 gap-1 lg:grid-cols-1">
			{#each fields as field}
				<div class="profile-data-field">
					<span class="text-neutral-600">{field.label}</span>
					<Input
						bind:value={paymentMethod[field.field]}
						type={field.type}
						placeholder={field.label}
						class="rounded-lg border-0 bg-transparent focus:border-white/5"
					/>
				</div>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	.profile-data-field {
		@apply flex flex-col gap-y-1 rounded-lg bg-neutral-900 px-3 py-2;
	}
</style>
