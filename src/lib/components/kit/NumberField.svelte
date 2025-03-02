<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';

	type Props = {
		min: number;
		max: number;
		value: number;
		onChange: (value: number) => void;
	};

	let { min, max, value = $bindable(), onChange }: Props = $props();

	const increment = () => {
		if (value < max) {
			value += 1;
			onChange(value);
		}
	};

	const decrement = () => {
		if (value > min) {
			value -= 1;
			onChange(value);
		}
	};
</script>

<div class="flex items-center space-x-3 rounded">
	<Button onclick={decrement} variant="ghost" class="flex items-center jutify-center size-8 rounded-full border">
		<i class="bi bi-dash leading-none"></i>
	</Button>
	
    <span>{value}</span>

	<Button onclick={increment} variant="ghost" class="flex items-center jutify-center size-8 rounded-full border">
		<i class="bi bi-plus leading-none"></i>
	</Button>
</div>
