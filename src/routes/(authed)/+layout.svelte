<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import Navbar from '$components/layout/Navbar.svelte';
	import Footer from '$components/layout/Footer.svelte';
	let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<Navbar />

{@render children()}

<Footer />
