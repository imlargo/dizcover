<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import * as Tabs from '$lib/components/ui/tabs/index.js';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();

	const sidebarLinks = [
		{ label: 'Perfil', href: `/profile/${data.userId}`, icon: 'bi bi-person' },
		{ label: 'Favoritos', href: `/profile/${data.userId}/favorites`, icon: 'bi bi-heart' },
		{
			label: 'Métodos de pago',
			href: `/profile/${data.userId}/payment-methods`,
			icon: 'bi bi-credit-card'
		},
		{ label: 'Facturas', href: `/profile/${data.userId}/invoices`, icon: 'bi bi-receipt' },
		{
			label: 'Mis reservas',
			href: `/profile/${data.userId}/reservations`,
			icon: 'bi bi-calendar-check'
		}
	];
</script>

<div class="px-4 pt-12 md:px-4 lg:px-12 lg:py-12">
	<div class="flex flex-col gap-x-6 md:grid md:grid-cols-12">
		<aside class="hidden flex-col gap-1 md:col-span-4 md:flex lg:col-span-2">
			{#each sidebarLinks as link}
				<a
					href={link.href}
					class="flex items-center gap-2 rounded-md px-6 py-2 font-semibold transition-all duration-200 hover:bg-white/5"
				>
					<i class={link.icon}></i>
					<span>{link.label}</span>
				</a>
			{/each}
		</aside>

		<div class="block w-full overflow-hidden md:hidden">
			<Tabs.Root class="w-full">
				<Tabs.List class="w-full overflow-x-auto">
					{#each sidebarLinks as link}
						<Tabs.Trigger value={link.href}>
							<a href={link.href} class="w-full px-2">
								<i class={link.icon}></i>
								<span>{link.label}</span>
							</a>
						</Tabs.Trigger>
					{/each}
				</Tabs.List>
				<Tabs.Content value="account">Make changes to your account here.</Tabs.Content>
				<Tabs.Content value="password">Change your password here.</Tabs.Content>
			</Tabs.Root>
		</div>

		<main class="md:col-span-8 lg:col-span-10">
			{@render children()}
		</main>
	</div>
</div>
