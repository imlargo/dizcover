<script lang="ts">
	import '$styles/app.scss';
	let { children } = $props();

	import { Toaster } from '$lib/components/ui/sonner/index.js';
</script>


{@render children()}

<Toaster />
