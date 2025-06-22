<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';

	type Option = {
		value: string;
		label: string;
	};

	type Props = {
		options: Option[];
		value?: string;
		placeholder?: string;
		onchange?: (value: any) => void;
	};

	let {
		value = $bindable(),
		options,
		placeholder = 'Please select an option...',
		onchange
	}: Props = $props();

	const triggerContent = $derived(options.find((op) => op.value === value)?.label ?? placeholder);

	$effect(() => {
		if (onchange) {
			onchange(value || '');
		}
	});
</script>

<Select.Root type="single" bind:value>
	<Select.Trigger class="w-full">
		{triggerContent}
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			{#each options as option (option.value)}
				<Select.Item value={option.value} label={option.label}>{option.label}</Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
</Select.Root>