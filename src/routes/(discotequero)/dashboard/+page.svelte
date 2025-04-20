<script lang="ts">
	import { storeAuth } from '$lib/store/auth.svelte';
	import { ChevronUp } from 'lucide-svelte';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
</script>


<div class="flex flex-col gap-y-8">
    <div class="flex items-center justify-between">
        <h1 class="text-3xl font-display">Bienvenid@, {storeAuth.user?.nombre_usuario}</h1>
    </div>

    <div class="grid grid-cols-2 gap-12">
        <div class="flex items-center justify-center bg-neutral-900 rounded-lg p-8 relative">
            <div class="space-y-2 text-center">
                <p class="font-display text-4xl">$3.500.000</p>
                <p class="text-neutral-400 font-medium">Total ingresos</p>
            </div>

            <div class="absolute bottom-0 right-0 p-4">
                <span class="text-green-500 flex gap-1 items-center font-bold">
                    <ChevronUp />
                    <span >100%</span>
                </span>
            </div>
        </div>

        <div class="grid grid-cols-2 gap-8 bg-neutral-900 rounded-lg p-8">
            <div class="space-y-2">
                <p class="text-neutral-400 font-medium">Ultimas reservas</p>
                <p class="font-display text-3xl">20</p>
            </div>

            <div class="space-y-2">
                <p class="text-neutral-400 font-medium">Ultimas reservas</p>
                <p class="font-display text-3xl">20</p>
            </div>

            <div class="space-y-2">
                <p class="text-neutral-400 font-medium">Ultimas reservas</p>
                <p class="font-display text-3xl">20</p>
            </div>

            <div class="space-y-2">
                <p class="text-neutral-400 font-medium">Ultimas reservas</p>
                <p class="font-display text-3xl">20</p>
            </div>
        </div>
    </div>
</div>

