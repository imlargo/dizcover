<script lang="ts">
	import type { PageData } from './$types';
	import { Input } from '$lib/components/ui/input/index.js';
	import { page } from '$app/state';

	import GaleryWrapper from '$lib/components/home/galery/GaleryWrapper.svelte';
	import GaleryItem from '$lib/components/home/galery/GaleryItem.svelte';
	import CardEstablecimiento from '$lib/components/home/galery/cards/CardEstablecimiento.svelte';
	import CardEvento from '$lib/components/home/galery/cards/CardEvento.svelte';
	import Share from '$lib/components/kit/Share.svelte';

	let { data }: { data: PageData } = $props();

	const { establecimientos, eventos } = data;

	const shareUrl = 'https://www.google.com';
</script>

<div class="flex flex-col gap-6">
	<h3 class="font-display text-3xl font-bold">Mis favoritos</h3>

	<div class="flex flex-col gap-12 rounded-lg bg-neutral-900 p-4">
		<div class="flex items-center justify-between">
			<div>
				<Input class="rounded-full bg-transparent" placeholder="Buscar" />
			</div>

			<Share
				title="Mira mis favoritos en dizcover: "
				description=""
				shareUrl={`${page.url.origin}/profile/123`}
			/>
		</div>

		<div class="flex flex-col gap-2">
			<h3 class="font-display text-xl font-semibold">Discotecas</h3>

			<div class="px-12">
				<GaleryWrapper title="Recomendados" tipo="establecimiento" showTitle={false}>
					{#each establecimientos as establecimiento}
						<GaleryItem>
							<CardEstablecimiento {establecimiento} />
						</GaleryItem>
					{/each}
				</GaleryWrapper>
			</div>
		</div>
		<div class="flex flex-col gap-2">
			<h3 class="font-display text-xl font-semibold">Eventos</h3>

			<div class="px-12">
				<GaleryWrapper title="Eventos" tipo="evento" showTitle={false}>
					{#each eventos as evento}
						<GaleryItem>
							<CardEvento {evento} variant="cover" />
						</GaleryItem>
					{/each}
				</GaleryWrapper>
			</div>
		</div>
	</div>
</div>
