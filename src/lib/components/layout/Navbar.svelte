<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input/index';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';

	let isOpenMenu = $state(false);
</script>

<nav class="border-b">
	<div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
		<div class="flex flex-1 items-center gap-12">
			<div class="flex w-full items-center justify-between md:w-auto">
				<a href="/" class="text-2xl font-bold text-primary"> MiLanding </a>
				<div class="flex items-center md:hidden">
					<Button variant="ghost" size="icon" class="md:hidden" onclick={() => (isOpenMenu = true)}>
						<span><i class="bi bi-list"></i></span>
					</Button>
				</div>
			</div>
            
            <form class="relative hidden md:block">
				<Input type="search" placeholder="Buscar..." class="w-64 pl-10 rounded-full" />
				<i class="bi bi-search absolute left-3 top-2.5 h-5 w-5 text-muted-foreground"></i>
			</form>
		</div>
        
		<div class="hidden md:flex md:items-center md:space-x-12">
			<div class="hidden md:ml-10 md:flex md:items-center md:space-x-12">
				<a
					href="/multimedia"
					class="text-sm font-medium text-muted-foreground hover:text-primary"
				>
					Multimedia
				</a>
				<a href="/mapa" class="text-sm font-medium text-muted-foreground hover:text-primary">
					Mapa
				</a>
			</div>

			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<Button variant="ghost" size="icon" class="relative h-8 w-8 rounded-full">
						<Avatar.Root class="h-8 w-8">
							<Avatar.Image src="/avatars/01.png" alt="@usuario" />
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
					class="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary"
				>
					Características
				</a>
				<a
					href="/precios"
					class="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary"
				>
					Precios
				</a>
				<a
					href="/contacto"
					class="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary"
				>
					Contacto
				</a>
			</div>
			<div class="border-t pb-3 pt-4">
				<div class="flex items-center px-4">
					<div class="flex-shrink-0">
						<Avatar.Root class="h-8 w-8">
							<Avatar.Image src="/avatars/01.png" alt="@usuario" />
							<Avatar.Fallback>U</Avatar.Fallback>
						</Avatar.Root>
					</div>
					<div class="ml-3">
						<div class="text-base font-medium">Usuario</div>
						<div class="text-sm font-medium text-muted-foreground">usuario@ejemplo.com</div>
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
