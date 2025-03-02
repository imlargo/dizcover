<script lang="ts">
    type Props = {
        imagen: string;
        nombre: string;
    }

    const { imagen, nombre }: Props = $props();
</script>


<div class="flex flex-col gap-4">
    <div class="size-56 rounded-full overflow-hidden">
        <img src={imagen} alt={nombre} class="size-56 object-cover rounded-full bg-neutral-700 hover:scale-110 transition-all duration-300" />

    </div>

    <div class="flex items-center justify-center">
        <span class="text-xl font-semibold">{nombre}</span>
    </div>
</div>