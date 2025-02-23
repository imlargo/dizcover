<script lang="ts">
	import { getContext, type Snippet } from "svelte";
	import * as Carousel from '$components/ui/carousel/index.js';

    type Props = {
        children: Snippet;
    };

    const { children }: Props = $props();
    const galeryConfig = getContext("galery-config");
</script>


<Carousel.Item class={galeryConfig.espaciado}>
    {@render children()}
</Carousel.Item>