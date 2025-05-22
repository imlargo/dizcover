<script lang="ts">
	import '$styles/app.scss';
	let { children } = $props();

	import Navbar from '$components/layout/Navbar.svelte';
	import Footer from '$components/layout/Footer.svelte';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
</script>

<Navbar />

{@render children()}

<Footer />
<Toaster />
