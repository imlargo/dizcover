<script lang="ts">
	import type { Evento } from '$lib/types/evento';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import CardEvento from './CardEvento.svelte';

    type Props = {
        title: string;
    }

    const { title }: Props = $props();

	const mockEventos: Evento[] = [
		{
			nombre: "MUSIC FESTIVAL 1",
			fecha: "Sábado 25 de septiembre",
			lugar: "Dulcinea",
			hora: {
				inicio: "8:00 PM",
				fin: "3:00 AM",
			}
		},
		{
			nombre: "ART EXHIBITION",
			fecha: "Domingo 26 de septiembre",
			lugar: "Galería Central",
			hora: {
				inicio: "10:00 AM",
				fin: "5:00 PM",
			}
		},
		{
			nombre: "FOOD FESTIVAL",
			fecha: "Lunes 27 de septiembre",
			lugar: "Parque Central",
			hora: {
				inicio: "12:00 PM",
				fin: "8:00 PM",
			}
		},
		{
			nombre: "BOOK FAIR",
			fecha: "Martes 28 de septiembre",
			lugar: "Biblioteca Nacional",
			hora: {
				inicio: "9:00 AM",
				fin: "6:00 PM",
			}
		},
		{
			nombre: "TECH CONFERENCE",
			fecha: "Miércoles 29 de septiembre",
			lugar: "Centro de Convenciones",
			hora: {
				inicio: "9:00 AM",
				fin: "5:00 PM",
			}
		},
		{
			nombre: "FILM FESTIVAL",
			fecha: "Jueves 30 de septiembre",
			lugar: "Cineplex",
			hora: {
				inicio: "6:00 PM",
				fin: "11:00 PM",
			}
		},
		{
			nombre: "THEATER PLAY",
			fecha: "Viernes 1 de octubre",
			lugar: "Teatro Principal",
			hora: {
				inicio: "7:00 PM",
				fin: "10:00 PM",
			}
		},
		{
			nombre: "COMEDY SHOW",
			fecha: "Sábado 2 de octubre",
			lugar: "Club de Comedia",
			hora: {
				inicio: "8:00 PM",
				fin: "11:00 PM",
			}
		},
		{
			nombre: "DANCE PERFORMANCE",
			fecha: "Domingo 3 de octubre",
			lugar: "Auditorio Municipal",
			hora: {
				inicio: "5:00 PM",
				fin: "8:00 PM",
			}
		},
	];
</script>

<div class="w-full space-y-8">
    <h3 class="text-center font-bold text-3xl">{title}</h3>

    <div class="px-16">
        <Carousel.Root class="w-full" opts={{
			loop: true,
		  }}>
            <Carousel.Content class="-ml-8">
                {#each mockEventos as evento}
                    <Carousel.Item class="pl-8 md:basis-1/2 lg:basis-1/5">
                        <CardEvento {evento} />
                    </Carousel.Item>
                {/each}
            </Carousel.Content>
            <Carousel.Previous />
            <Carousel.Next />
        </Carousel.Root>
    </div>
</div>