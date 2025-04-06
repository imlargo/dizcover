<script lang="ts">
	import { onMount } from 'svelte';
    import type { PageData } from './$types';
	import { browser } from '$app/environment';
	import { goto, invalidateAll } from '$app/navigation';

    let { data }: { data: PageData } = $props();

    onMount(async () => {
        if (browser) {
            await invalidateAll();
            await goto("/", { invalidateAll: true })
        }
    });
</script>

<span>
    Autorizando...
</span>