<script lang="ts">
	const imgSource =
		'https://s3-alpha-sig.figma.com/img/0b61/5b62/97a056e67a0e42203ed734ace25c3522?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GnBuvRv8R0N5kFe5Tnl9iK00hEV7KLXVC6jm5p0ZOkhNya8JPkGg-zyspWK1tyhzqdhGvqAHQIvABqU5mHdxZILSjrtD04qr4cUvDFr5B7rk82U0r44SzgVJHp4wWeid9zo4CuByk50~L561OJNvzUqACUTPLNz61pv5VN07jROf2Q-g42AVSZdQ7CupZGGT-2zvoD~CFSmFo~oB-aUIAR8HkQpaB1fM1KfDNQ4bbUJuYEXanV9dIzjI8W-Xb2ioNgOcMOyulDzcPK4Xw8~Ue08g2uSQODihCRruldACLvEtBTgOR9MyynBmbdf0-XNi2oBQWkxeQiAMAPR-1w5kYw__';

	const establecimiento = {
        nombre: "Dulcinea",
        descripcion: "Dulcinea, la joya de la vida nocturna de Medellín, te espera con su ambiente exclusivo y noches llenas de ritmo y estilo. Vive una experiencia única en uno de los clubes más icónicos de la ciudad.",
        tags: ["Crossover", "Destacado", "Popular"],
    };

    import { Badge } from "$lib/components/ui/badge/index.js";
</script>

<div class="h-screen w-full relative">
	<img src={imgSource} class="w-full h-full object-cover pointer-events-none select-none" alt="hero" />

    <div class="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 space-y-6 p-8 text-white">
        <h5 class="font-bold text-6xl">{establecimiento.nombre}</h5>

        <p class="text-lg">{establecimiento.descripcion}</p>

        <div class="flex space-x-4">
            {#each establecimiento.tags as tag}
                <Badge variant="purple" class="text-base">{ tag}</Badge>
            {/each}
        </div>
    </div>
</div>
