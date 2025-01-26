<script lang="ts">
	import '../app.css';
	let { children } = $props();

	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
</script>

<Navbar />

{@render children()}

<Footer />
