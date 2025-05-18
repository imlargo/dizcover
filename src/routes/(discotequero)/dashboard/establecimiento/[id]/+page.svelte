<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const establecimiento = $state(data.establecimiento);
	import { Button } from '$lib/components/ui/button/index.js';
	import { Pencil, Trash, View } from 'lucide-svelte';
</script>

<main class="space-y-4">
	<div class="flex items-center justify-between">
		<h2 class="font-display text-2xl">{establecimiento.nombre}</h2>

		<div class="flex items-center gap-x-2">
			<Button variant="ghost" size="icon">
				<View class="size-4" />
			</Button>

			<Button variant="ghost" size="icon">
				<Pencil class="size-4" />
			</Button>

			<Button variant="ghost" size="icon">
				<Trash class="size-4" />
			</Button>
		</div>
	</div>

	<div class="w-full aspect-[3/1] overflow-hidden rounded-lg">
		<img src={establecimiento.primera_imagen} alt={establecimiento.nombre} class="w-full h-auto object-cover" />
	</div>
</main>
