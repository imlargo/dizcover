<script lang="ts">
	type Props = {
		variant?: 'primary' | 'secondary';
	};

	const { variant = 'primary' }: Props = $props();
</script>

<div class="slider flex max-w-max items-center justify-center gap-2">
	{#each { length: 3 }, i}
		<div
			class="inline-flex h-4 w-16 rounded-full {i === 1
				? variant === 'primary'
					? 'bg-dizcover-primary'
					: 'bg-dizcover-secondary'
				: 'bg-accent'}"
		></div>
	{/each}
</div>

<style>
	.slider {
		mask-image: linear-gradient(
			90deg,
			rgba(255, 255, 255, 0) 0%,
			rgba(0, 0, 0, 1) 40%,
			rgba(0, 0, 0, 1) 60%,
			rgba(255, 255, 255, 0) 100%
		);
	}
</style>
