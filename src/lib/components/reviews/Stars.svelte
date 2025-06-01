<script lang="ts">
	import { Star } from 'lucide-svelte';

	type Props = {
		rate: number;
	};

	let { rate }: Props = $props();

	const numbers = Array.from({ length: 5 }).map((_, i) => i + 1);
</script>

<div class="flex items-center gap-1">
	{#each numbers as number (number)}
		<Star
			class={`size-4 ${number <= rate ? 'fill-dizcover-primary text-dizcover-primary' : 'fill-none text-dizcover-primary'}`}
		/>
	{/each}
</div>
