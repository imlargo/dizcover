<script lang="ts">
	type Props = {
		images: string[];
	};

	const { images }: Props = $props();
</script>

<div class="grid grid-cols-5 gap-4 overflow-hidden">
	<div class="col-span-2">
		<img src={images ? images[0] : ''} alt="" />
	</div>

	<div>
		<img src={images ? images[1] : ''} alt="" />
	</div>

	<div class="col-span-2 grid grid-cols-1 gap-4">
		<div class="grid grid-cols-2 gap-4">
			<img src={images ? images[2] : ''} alt="" />
			<img src={images ? images[3] : ''} alt="" />
		</div>
		<div>
			<img src={images ? images[4] : ''} alt="" class="col-span-2" />
		</div>
	</div>
</div>

<style>
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		@apply rounded-lg;
		filter: grayscale(100%) brightness(50%);
		transition: filter 0.4s;
	}

	img:hover {
		filter: grayscale(0%) brightness(100%);
	}
</style>
