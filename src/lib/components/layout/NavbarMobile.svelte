<script lang="ts">
	import { Button } from '$components/ui/button';
	import { Input } from '$components/ui/input/index';
	import * as DropdownMenu from '$components/ui/dropdown-menu/index.js';
	import * as Avatar from '$components/ui/avatar/index.js';
	import { page } from '$app/stores';
	import { storeAuth } from '$lib/store/auth.svelte';
	import { LogOut, User } from 'lucide-svelte';
	import * as Sheet from '$lib/components/ui/sheet/index.js';

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
	<div class="flex w-full items-center justify-between px-4 py-4">
		<div class="flex flex-1 items-center gap-12">
			<div class="flex w-full items-center justify-between md:w-auto">
				<a data-sveltekit-reload href="/" class="text-lg font-bold text-white">
					<img src="/dizcover-logo.png" alt="" class="w-44" />
				</a>
				<div class="flex items-center md:hidden">
					<Sheet.Root>
						<Sheet.Trigger>
							<Button variant="ghost" size="icon" class="md:hidden">
								<span><i class="bi bi-list"></i></span>
							</Button></Sheet.Trigger
						>
						<Sheet.Content side="right" class="space-y-4">
							<Sheet.Header>
								<Sheet.Title class="text-start">Menú</Sheet.Title>
								<Sheet.Description class="text-start">
									Inicia sesión para acceder a más funciones.
								</Sheet.Description>
							</Sheet.Header>
							{#if storeAuth.user?.id}
								<div class="flex items-center px-4">
									<div class="flex-shrink-0">
										<Avatar.Root class="size-10">
											<Avatar.Image
												src={storeAuth.user?.foto_perfil}
												alt={`@${storeAuth.user?.nombre_usuario}`}
											/>
											<Avatar.Fallback
												>{getInitials(storeAuth.user?.nombre_completo)}</Avatar.Fallback
											>
										</Avatar.Root>
									</div>
									<div class="ml-3">
										<div class="text-base font-medium">{storeAuth.user?.nombre_completo}</div>
										<div class="text-sm font-medium text-gray-200">{storeAuth.user?.email}</div>
									</div>
								</div>

								<div class="mt-3 space-y-1 px-2">
									<Button variant="ghost" class="w-full text-left">
										<a
											href="/profile/{storeAuth.user?.id || '0'}"
											class="flex w-full items-center gap-1"
											data-sveltekit-reload
										>
											<User />
											<span>Perfil</span>
										</a>
									</Button>
									<Button variant="ghost" class="w-full text-left">
										<a href="/logout" class="flex w-full items-center gap-1" data-sveltekit-reload>
											<LogOut />
											<span>Cerrar sesión</span>
										</a>
									</Button>
								</div>
							{:else}
								<Button
									href="/login"
									data-sveltekit-reload
									class="rounded-full bg-dizcover-primary px-6 py-2 text-sm font-semibold text-white transition-all hover:bg-dizcover-primary/80 hover:shadow-lg hover:shadow-dizcover-primary/20"
								>
									Iniciar sesión
								</Button>
							{/if}
						</Sheet.Content>
					</Sheet.Root>
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
	</div>
</nav>

<style>
	.glass {
		--blur: 8px;
		backdrop-filter: blur(var(--blur)) !important;
		-webkit-backdrop-filter: blur(var(--blur)) !important;
	}
</style>
