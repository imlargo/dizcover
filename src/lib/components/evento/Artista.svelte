<script lang="ts">
	type Props = {
		imagen: string;
		nombre: string;
	};

	const { imagen, nombre }: Props = $props();
</script>

<div class="flex flex-col gap-4">
	<div class="size-56 overflow-hidden rounded-full">
		<img
			src={imagen}
			alt={nombre}
			class="size-56 rounded-full bg-neutral-700 object-cover transition-all duration-300 hover:scale-110"
		/>
	</div>

	<div class="flex items-center justify-center">
		<span class="text-xl font-semibold">{nombre}</span>
	</div>
</div>
