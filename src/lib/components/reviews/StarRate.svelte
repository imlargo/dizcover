<script lang="ts">
	import { Star } from 'lucide-svelte';

	type Props = {
		onRate: (rate: number) => void;
		onDeleteRate: () => void;
		rate?: number;
	};

	let { rate = $bindable(), onRate, onDeleteRate }: Props = $props();

	const max = 5;
	let hoveredIndex = $state(-1);
	let selectedIndex = $state(rate === undefined ? -1 : rate - 1);

	function selectRate(index: number) {
		// Deseleccionar
		if (index === selectedIndex) {
			selectedIndex = -1;
			hoveredIndex = -1;
			rate = undefined;
			onDeleteRate();
			return;
		}

		selectedIndex = index;
		rate = index + 1;
		onRate(index + 1);
	}
</script>

<div class="flex items-center gap-1">
	{#each { length: max }, index (index)}
		{@const active = index <= hoveredIndex || index <= selectedIndex}
		<button
			type="button"
			class={`bi cursor-pointer p-0.5 transition-all duration-200 ${active ? 'bi-star-fill text-dizcover-primary' : 'bi-star text-dizcover-primary'}`}
			onclick={() => selectRate(index)}
			onmouseenter={() => {
				hoveredIndex = index;
			}}
			onmouseleave={() => {
				hoveredIndex = -1;
			}}
			aria-label={`Rate ${index + 1}`}
		></button>
	{/each}
</div>
