<script lang="ts">
	type Props = {
		images: string[];
	};

	const { images }: Props = $props();
</script>

<div class="grid grid-cols-5 gap-4 overflow-hidden">
	{#if images.length >= 1}
		<div class="col-span-{images.length === 1 ? '5' : '2'}">
			<img src={images[0]} class="h-[537px]" alt="" />
		</div>
	{/if}

	{#if images.length >= 2}
		<div class:col-span-3={images.length === 2}>
			<img src={images[1]} alt="" />
		</div>
	{/if}

	{#if images.length >= 3}
		<div class="col-span-2 grid grid-cols-1 gap-4">
			<div class="grid grid-cols-{images.length > 3 ? '2' : '1'} gap-4">
				<img src={images[2]} alt="" />
				{#if images.length >= 4}
					<img src={images[3]} alt="" />
				{/if}
			</div>
			{#if images.length >= 5}
				<div>
					<img src={images[4]} alt="" class="col-span-2" />
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		@apply rounded-lg bg-white/5;
		filter: grayscale(100%) brightness(50%);
		transition: filter 0.4s;
	}

	img:hover {
		filter: grayscale(0%) brightness(100%);
	}
</style>
