<script lang="ts">
	import type { PageData } from './$types';
	import { Input } from '$lib/components/ui/input/index.js';
	import Share from '$lib/components/kit/Share.svelte';
	import { page } from '$app/state';
	import type { User } from '$lib/types/models/user';

	let { data }: { data: PageData } = $props();

	const authedUser = data.user as User;

	type UserProfile = {
		name: string;
		lastname: string;
		email: string;
		password: string;
		birthdate: string;
		country: string;
		subdivision: string;
		city: string;
		phone: string;

		profile_image: string;
		username: string;
	};

	type Field = {
		label: string;
		field: keyof UserProfile;
		type: 'text' | 'password' | 'email' | 'date';
	};

	const fields = [
		{
			label: 'Nombres',
			field: 'name',
			type: 'text'
		},
		{
			label: 'Apellidos',
			field: 'lastname',
			type: 'text'
		},
		{
			label: 'Correo electronico',
			field: 'email',
			type: 'email'
		},
		{
			label: 'Contraseña',
			field: 'password',
			type: 'password'
		},
		{
			label: 'Fecha de nacimiento',
			field: 'birthdate',
			type: 'date'
		},
		{
			label: 'País',
			field: 'country',
			type: 'text'
		},
		{
			label: 'Departamento',
			field: 'subdivision',
			type: 'text'
		},
		{
			label: 'Ciudad',
			field: 'city',
			type: 'text'
		},
		{
			label: 'Teléfono',
			field: 'phone',
			type: 'text'
		}
	];

	const userProfile: UserProfile = {
		name: 'Juan',
		lastname: 'Perez',
		email: authedUser?.email,
		password: '123',
		birthdate: '1990-01-01',
		country: 'Colombia',
		subdivision: 'Antioquia',
		city: 'Medellin',
		phone: '1234567890',

		profile_image: authedUser?.foto_perfil,
		username: authedUser?.nombre_usuario
	};
</script>

<div class="flex flex-col gap-8">
	<h3 class="font-display text-3xl font-bold">Mi perfil</h3>

	<div class="flex flex-col gap-1">
		<div class="grid grid-cols-12 rounded-lg bg-neutral-900 p-6">
			<div class="col-span-2">
				<img
					src={userProfile.profile_image}
					alt={userProfile.username}
					class="size-44 rounded-full object-cover"
				/>
			</div>
			<div class="col-span-10 flex flex-col gap-2">
				<div class="items-top flex justify-between">
					<h4 class="font-display text-3xl font-semibold">@{userProfile.username}</h4>
					<Share
						title="Mira este perfil en dizcover: "
						description=""
						shareUrl={`${page.url.origin}/profile/${data.userId}/${userProfile.username}`}
					/>
				</div>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-1 lg:grid-cols-2">
			{#each fields as field}
				<div class="profile-data-field">
					<span class="text-neutral-600">{field.label}</span>
					<Input
						value={userProfile[field.field]}
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
