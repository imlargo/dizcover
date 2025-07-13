<script lang="ts">
	import { Button } from '$components/ui/button';
	import { Input } from '$components/ui/input/index';
	import * as DropdownMenu from '$components/ui/dropdown-menu/index.js';
	import * as Avatar from '$components/ui/avatar/index.js';
	import { page } from '$app/stores';
	import { storeAuth } from '$lib/store/auth.svelte';
	import { LogOut, User } from 'lucide-svelte';

	let isOpenMenu = $state(false);
	const currentRoute = $state($page.url.pathname);
	const isHome = $derived(currentRoute === '/');

	function getInitials(name?: string): string {
		if (!name || typeof name !== 'string') return '';

		const names = name.trim().split(/\s+/);
		if (!names.length) return '';

		if (names.length === 1) {
			return name.length > 1 ? name.slice(0, 2).toUpperCase() : name.toUpperCase();
		}

		return names
			.slice(0, 2)
			.map((part) => part[0])
			.join('')
			.toUpperCase();
	}
</script>

<nav class="glass z-40 bg-accent/40 {isHome ? 'absolute w-full text-white' : 'border-b'}">
	<div class="flex w-full items-center justify-between px-10 py-6">
		<div class="flex flex-1 items-center gap-12">
			<div class="flex w-full items-center justify-between md:w-auto">
				<a data-sveltekit-reload href="/" class="text-3xl font-bold text-white">
					<img src="/dizcover-logo.png" alt="" />
				</a>
				<div class="flex items-center md:hidden">
					<Button variant="ghost" size="icon" class="md:hidden" onclick={() => (isOpenMenu = true)}>
						<span><i class="bi bi-list"></i></span>
					</Button>
				</div>
			</div>

			<form class="relative hidden md:block">
				<Input
					type="search"
					placeholder="Buscar..."
					class="w-96 rounded-full pl-4 {isHome
						? 'border-accent bg-transparent placeholder:text-secondary-foreground'
						: ''}"
				/>
				<!--
				<i class="bi bi-search absolute left-3 top-2.5 h-5 w-5 text-gray-200"></i>
				-->
			</form>
		</div>

		<div class="hidden md:flex md:items-center md:space-x-12">
			<div class="hidden md:ml-10 md:flex md:items-center md:space-x-12">
				<a
					data-sveltekit-reload
					href="/multimedia"
					class="font-display text-sm font-medium text-gray-200 hover:text-white"
				>
					Multimedia
				</a>
				<a
					data-sveltekit-reload
					href="/mapa"
					class="font-display text-sm font-medium text-gray-200 hover:text-white"
				>
					Mapa
				</a>
			</div>

			{#if storeAuth.user}
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<Button variant="ghost" size="icon" class="relative size-10 rounded-full">
							<Avatar.Root class="size-10">
								<Avatar.Image
									src={storeAuth.user?.foto_perfil}
									alt={`@${storeAuth.user?.nombre_usuario}`}
								/>
								<Avatar.Fallback>{getInitials(storeAuth.user?.nombre_completo)}</Avatar.Fallback>
							</Avatar.Root>
						</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content align="end">
						<DropdownMenu.Label>Mi Cuenta</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.Item>
							<a
								href="/profile/{storeAuth.user?.id || '0'}"
								class="flex w-full items-center gap-1"
								data-sveltekit-reload
							>
								<User />
								<span>Perfil</span>
							</a>
						</DropdownMenu.Item>
						<DropdownMenu.Item>
							<a href="/logout" class="flex w-full items-center gap-1" data-sveltekit-reload>
								<LogOut />
								<span>Cerrar sesión</span>
							</a>
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			{:else}
				<Button
					href="/login"
					data-sveltekit-reload
					class="rounded-full bg-dizcover-primary px-6 py-2 text-sm font-semibold text-white transition-all hover:bg-dizcover-primary/80 hover:shadow-lg hover:shadow-dizcover-primary/20"
				>
					Iniciar sesión
				</Button>
			{/if}
		</div>
	</div>
</nav>

<style>
	.glass {
		--blur: 8px;
		backdrop-filter: blur(var(--blur)) !important;
		-webkit-backdrop-filter: blur(var(--blur)) !important;
	}
</style>
