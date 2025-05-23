<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import Navbar from '$components/layout/Navbar.svelte';
	import Footer from '$components/layout/Footer.svelte';
	import BottomNavigation from '$lib/components/layout/BottomNavigation.svelte';
	import { Home, MapPin, User, type Icon as IconType } from 'lucide-svelte';

	type NavLink = {
		href: string;
		name: string;
		icon: typeof IconType;
	};

	const links: NavLink[] = [
		{
			name: 'Home',
			href: '/',
			icon: Home
		},
		{
			name: 'Mapa',
			href: '/geo',
			icon: MapPin
		},
		{
			name: 'Profile',
			href: '/profile',
			icon: User
		}
	];

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<div class="hidden md:block">
	<Navbar />
</div>

<div class="px-4 pb-24 pt-12 md:px-12 md:pb-12 xl:px-24">
	{@render children()}
</div>

<div class="block md:hidden">
	<BottomNavigation {links} />
</div>

<Footer />
