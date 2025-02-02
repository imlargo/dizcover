<script lang="ts">
	import '../app.css';
	let { children } = $props();

	import Navbar from '$components/layout/Navbar.svelte';
	import Footer from '$components/layout/Footer.svelte';
</script>

<Navbar />

{@render children()}

<Footer />
