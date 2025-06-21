<script lang="ts">
	import '$styles/app.scss';
	let { children } = $props();

	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import { storeAuth } from '$lib/store/auth.svelte';
</script>

{@render children()}

<Toaster />
