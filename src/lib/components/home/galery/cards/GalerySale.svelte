<script lang="ts">
	import * as Carousel from '$components/ui/carousel/index.js';
	import type { Cupon } from '$lib/types/models/cupon';

	type Props = {
		cupones: Cupon[];
	};

	const { cupones }: Props = $props();
</script>

<div class="w-full space-y-8">
	<div class="">
		<Carousel.Root
			class="w-full"
			opts={{
				loop: true
			}}
		>
			<Carousel.Content class="-ml-4">
				{#each cupones as cupon}
					<Carousel.Item class="pl-4 md:basis-1/2 lg:basis-1/3">
						<a class="block overflow-hidden rounded-lg bg-white/5" href="/cupon/{cupon.id}">
							<img class="h-[137px] w-[695px] border-none object-cover" src={cupon.imagen} alt="" />
						</a>
					</Carousel.Item>
				{/each}
			</Carousel.Content>
			<Carousel.Previous />
			<Carousel.Next />
		</Carousel.Root>
	</div>
</div>
