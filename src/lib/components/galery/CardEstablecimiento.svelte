<script lang="ts">
    import { Badge } from "$lib/components/ui/badge/index";
    import type { Establecimiento } from "$lib/types/establecimiento";

    type Props = {
        establecimiento: Establecimiento
    }

    const { establecimiento }: Props = $props()
</script>


<div class="rounded-md overflow-hidden relative">
    <a href="/" class="w-[695px] h-[349px] rounded-md overflow-hidden">
        <img src="/disco.png" alt="" class="w-full h-full rounded-md object-cover">
    </a>


    <div class="absolute top-0 left-0 text-white bg-black bg-opacity-70 p-3 rounded-br-md">
        <span>{ establecimiento.nombre }</span>
    </div>

    <div class="absolute bottom-0 left-0 p-3 flex space-x-2 items-center justify-center bg-black bg-opacity-40 w-full">
        {#each establecimiento.tags as tag}
            <Badge variant="secondary">{ tag }</Badge>
        {/each}
    </div>
</div>