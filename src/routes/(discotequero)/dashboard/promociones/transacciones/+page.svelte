<script lang="ts">
	import type { PageData } from './$types';
	import { ChevronUp, History, Plus } from 'lucide-svelte';

	let { data }: { data: PageData } = $props();
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Table from '$lib/components/ui/table/index.js';

	const cupones = [
		{
			image: '/promo.jpg',
			establecimiento: 'Night club bolivar',
			descripcion: 'Six pack cervezas',
			porcentaje: 25
		},
		{
			image: '/promo.jpg',
			establecimiento: 'Night club bolivar',
			descripcion: 'Six pack cervezas',
			porcentaje: 25
		},
		{
			image: '/promo.jpg',
			establecimiento: 'Night club bolivar',
			descripcion: 'Six pack cervezas',
			porcentaje: 25
		},
		{
			image: '/promo.jpg',
			establecimiento: 'Night club bolivar',
			descripcion: 'Six pack cervezas',
			porcentaje: 25
		},
		{
			image: '/promo.jpg',
			establecimiento: 'Night club bolivar',
			descripcion: 'Six pack cervezas',
			porcentaje: 25
		},
		{
			image: '/promo.jpg',
			establecimiento: 'Night club bolivar',
			descripcion: 'Six pack cervezas',
			porcentaje: 25
		}
	];
</script>

<div class="flex flex-col gap-y-8">
	<div class="flex items-center justify-between">
		<h1 class="font-display text-3xl">Mis promociones</h1>

		<Button variant="link" class="text-white">
			<History />
			<span>Historial de trasacciones</span>
		</Button>
	</div>

	<div>
		<Table.Root>
			<Table.Caption>Transacciones.</Table.Caption>
			<Table.Header>
				<Table.Row>
					<Table.Head>Id</Table.Head>
                    <Table.Head class="w-[100px]">Discoteca</Table.Head>
					<Table.Head>Item</Table.Head>
					<Table.Head class="text-right">Valor</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
                {#each cupones as cupon, i }
                <Table.Row>
					<Table.Cell class="font-medium">ID#{i}</Table.Cell>
					<Table.Cell>{cupon.establecimiento}</Table.Cell>
					<Table.Cell>Cupon</Table.Cell>
					<Table.Cell class="text-right">$250.00</Table.Cell>
				</Table.Row>    
                {/each}
				
			</Table.Body>
		</Table.Root>
	</div>
</div>
