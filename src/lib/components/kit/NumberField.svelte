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
	<Button
		onclick={decrement}
		variant="ghost"
		class="jutify-center flex size-8 items-center rounded-full border border-[#3BFF00] hover:bg-white/10"
	>
		<i class="bi bi-dash leading-none text-[#3BFF00]"></i>
	</Button>

	<span>{value}</span>

	<Button
		onclick={increment}
		variant="ghost"
		class="jutify-center flex size-8 items-center rounded-full border border-[#3BFF00] hover:bg-white/10"
	>
		<i class="bi bi-plus leading-none text-[#3BFF00]"></i>
	</Button>
</div>
