<script lang="ts">
	import type { PageData } from './$types';
	import { Input } from '$lib/components/ui/input/index.js';
	import Share from '$lib/components/kit/Share.svelte';
	import { page } from '$app/state';
	import type { User } from '$lib/types/models/user';
	import { storeAuth } from '$lib/store/auth.svelte';

	let { data }: { data: PageData } = $props();

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
			label: 'Nombre de usuario',
			field: 'nombre_usuario',
			type: 'text'
		},
		{
			label: 'Nombre completo',
			field: 'nombre_completo',
			type: 'text'
		},
		{
			label: 'Correo electronico',
			field: 'email',
			type: 'email'
		},
		{
			label: 'Numero de identificacion',
			field: 'fiestero.num_identificacion',
			type: 'text'
		}
	];
</script>

<div class="flex flex-col gap-8">
	<h3 class="font-display text-3xl font-bold">Mi perfil</h3>

	<div class="flex flex-col gap-1">
		<div class="grid grid-cols-12 rounded-lg bg-neutral-900 p-6">
			<div class="col-span-2">
				<img
					src={storeAuth.user?.foto_perfil}
					alt={storeAuth.user?.nombre_usuario}
					class="size-44 rounded-full object-cover"
				/>
			</div>
			<div class="col-span-10 flex flex-col gap-2">
				<div class="items-top flex justify-between">
					<h4 class="font-display text-3xl font-semibold">@{storeAuth.user?.nombre_usuario}</h4>
					<Share
						title="Mira este perfil en dizcover: "
						description=""
						shareUrl={`${page.url.origin}/profile/${storeAuth.user?.nombre_usuario}`}
					/>
				</div>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-1 lg:grid-cols-2">
			{#each fields as field}
				<div class="profile-data-field">
					<span class="text-neutral-600">{field.label}</span>
					<Input
						value={storeAuth.user[field.field]}
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
