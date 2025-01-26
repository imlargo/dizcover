<script lang="ts">
	import type { Establecimiento } from '$lib/types/establecimiento';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import CardEstablecimiento from './CardEstablecimiento.svelte';

    type Props = {
        title: string;
    }

    const { title }: Props = $props();

	const mockEstablecimientos: Establecimiento[] = [
		{
			nombre: 'Establecimiento 1',
			tags: ['tag1', 'tag2']
		},
		{
			nombre: 'Establecimiento 2',
			tags: ['tag1', 'tag2']
		},
		{
			nombre: 'Establecimiento 3',
			tags: ['tag1', 'tag2']
		},
		{
			nombre: 'Establecimiento 4',
			tags: ['tag1', 'tag2']
		},
		{
			nombre: 'Establecimiento 5',
			tags: ['tag1', 'tag2']
		}
	];
</script>

<div class="w-full space-y-8">
    <h3 class="text-center font-bold text-3xl">{title}</h3>

    <div class="px-16">
        <Carousel.Root class="w-full">
            <Carousel.Content class="-ml-2">
                {#each mockEstablecimientos as establecimiento}
                    <Carousel.Item class="pl-2 md:basis-1/2 lg:basis-1/3">
                        <CardEstablecimiento {establecimiento} />
                    </Carousel.Item>
                {/each}
            </Carousel.Content>
            <Carousel.Previous />
            <Carousel.Next />
        </Carousel.Root>
    </div>
</div>