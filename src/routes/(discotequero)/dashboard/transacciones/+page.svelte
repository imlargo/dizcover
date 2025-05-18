<script lang="ts">
	import type { PageData } from './$types';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Table from '$lib/components/ui/table/index.js';

	let { data }: { data: PageData } = $props();
</script>

<main class="space-y-6">
	<div class="mb-4 flex items-center justify-between">
		<h1 class="font-display text-2xl font-bold">Transacciones</h1>
	</div>

	<Tabs.Root value="reservas" class="w-full">
		<Tabs.List class="bg-neutral-900">
			<Tabs.Trigger value="reservas">Reservas</Tabs.Trigger>
			<Tabs.Trigger value="cupones">Cupones</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="reservas">
			<Table.Root>
				<Table.Caption>Historial de reservas.</Table.Caption>
				<Table.Header>
					<Table.Row class="text-white">
						<Table.Head>ID</Table.Head>
						<Table.Head>Establecimiento</Table.Head>
						<Table.Head>Fecha</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					<Table.Row>
						<Table.Cell></Table.Cell>
						<Table.Cell></Table.Cell>
						<Table.Cell></Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table.Root>
		</Tabs.Content>
		<Tabs.Content value="cupones">
            <Table.Root>
				<Table.Caption>Historial de reservas.</Table.Caption>
				<Table.Header>
					<Table.Row class="text-white">
						<Table.Head>ID</Table.Head>
						<Table.Head>Cupon</Table.Head>
						<Table.Head>Valor</Table.Head>
						<Table.Head>Cantidad</Table.Head>
						<Table.Head>Total</Table.Head>
                    </Table.Row>
				</Table.Header>
				<Table.Body>
					<Table.Row>
						<Table.Cell></Table.Cell>
						<Table.Cell></Table.Cell>
						<Table.Cell></Table.Cell>
						<Table.Cell></Table.Cell>
						<Table.Cell></Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table.Root>
        </Tabs.Content>
	</Tabs.Root>
</main>
