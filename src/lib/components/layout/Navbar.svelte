<script lang="ts">
	import { Button } from '$components/ui/button';
	import { Input } from '$components/ui/input/index';
	import * as DropdownMenu from '$components/ui/dropdown-menu/index.js';
	import * as Avatar from '$components/ui/avatar/index.js';
	import { page } from '$app/stores';

	let isOpenMenu = $state(false);
	const currentRoute = $state($page.url.pathname);
	const isHome = $derived(currentRoute === '/');
</script>

<nav class="navbar z-40 {isHome ? 'absolute w-full text-white' : 'border-b'}">
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
					class="w-96 rounded-full bg-transparent pl-10"
				/>
				<i class="bi bi-search absolute left-3 top-2.5 h-5 w-5 text-gray-200"></i>
			</form>
		</div>

		<div class="hidden md:flex md:items-center md:space-x-12">
			<div class="hidden md:ml-10 md:flex md:items-center md:space-x-12">
				<a
					data-sveltekit-reload
					href="/multimedia"
					class="text-sm font-medium text-gray-200 hover:text-white"
				>
					Multimedia
				</a>
				<a
					data-sveltekit-reload
					href="/mapa"
					class="text-sm font-medium text-gray-200 hover:text-white"
				>
					Mapa
				</a>
			</div>

			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<Button variant="ghost" size="icon" class="relative size-10 rounded-full">
						<Avatar.Root class="size-10">
							<Avatar.Image
								src="https://avatars.githubusercontent.com/u/124599?v=4"
								alt="@usuario"
							/>
							<Avatar.Fallback>U</Avatar.Fallback>
						</Avatar.Root>
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content align="end">
					<DropdownMenu.Label>Mi Cuenta</DropdownMenu.Label>
					<DropdownMenu.Separator />
					<DropdownMenu.Item>Perfil</DropdownMenu.Item>
					<DropdownMenu.Item>Configuración</DropdownMenu.Item>
					<DropdownMenu.Item>Cerrar sesión</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>

			<Button variant="ghost" size="icon" onclick={() => (isOpenMenu = true)}>
				<span><i class="bi bi-list"></i></span>
			</Button>
		</div>
	</div>
	{#if isOpenMenu}
		<div class="md:hidden">
			<div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
				<a
					href="/caracteristicas"
					class="block px-3 py-2 text-base font-medium text-gray-200 hover:text-white"
				>
					Características
				</a>
				<a
					href="/precios"
					class="block px-3 py-2 text-base font-medium text-gray-200 hover:text-white"
				>
					Precios
				</a>
				<a
					href="/contacto"
					class="block px-3 py-2 text-base font-medium text-gray-200 hover:text-white"
				>
					Contacto
				</a>
			</div>
			<div class="border-t pb-3 pt-4">
				<div class="flex items-center px-4">
					<div class="flex-shrink-0">
						<Avatar.Root class="h-8 w-8">
							<Avatar.Image
								src="https://avatars.githubusercontent.com/u/124599?v=4"
								alt="@usuario"
							/>
							<Avatar.Fallback>U</Avatar.Fallback>
						</Avatar.Root>
					</div>
					<div class="ml-3">
						<div class="text-base font-medium">Usuario</div>
						<div class="text-sm font-medium text-gray-200">usuario@ejemplo.com</div>
					</div>
				</div>
				<div class="mt-3 space-y-1 px-2">
					<Button variant="ghost" class="w-full justify-start">Perfil</Button>
					<Button variant="ghost" class="w-full justify-start">Configuración</Button>
					<Button variant="ghost" class="w-full justify-start">Cerrar sesión</Button>
				</div>
			</div>
		</div>
	{/if}
</nav>

<style>
	.navbar {
		--bg-color: rgb(39, 39, 39, 0.2) !important;
		--blur: 4px;
		background-color: var(--bg-color) !important;
		backdrop-filter: blur(var(--blur)) !important;
		-webkit-backdrop-filter: blur(var(--blur)) !important;
	}
</style>
