<script lang="ts">
	const imgSource =
		'https://s3-alpha-sig.figma.com/img/0b61/5b62/97a056e67a0e42203ed734ace25c3522?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=cXRFWze1EznZ1qOO8FlJnfFD9sTO86W3Ig6BXK5tM69RWW2al2mtm7mFuUskc3QfRzIRdDVyw40dWtZ7kJ3v16bSbPdzaITr0He77kcjDMNCtw~EXbYiifbuwgH0t9mXGbGyXLtapOSKNt777~ReYL963OTKqvUCnjRYofZdXpg5pxFGVEQBguVsfK-TKAHgaj2NXfzfLw7Eqr8R5yI-uOIVu8xN4ofs8fBNXzGd-H7uStoQJ4yVmi3TBnPF8u-AvSQ1RAdClNDcom3-TmYRFoVG8989976ZYhjBFAMtvZtqxku3MlfWiWCtzXXpVKmTV3UnzDlmVAk4AkVsGrgRww__';

	const establecimiento = {
		nombre: 'Dulcinea',
		descripcion:
			'Dulcinea, la joya de la vida nocturna de Medellín, te espera con su ambiente exclusivo y noches llenas de ritmo y estilo. Vive una experiencia única en uno de los clubes más icónicos de la ciudad.',
		tags: ['Crossover', 'Destacado', 'Popular']
	};

	import { Badge } from '$components/ui/badge/index.js';
</script>

<div class="relative h-screen w-full">
	<img
		src={imgSource}
		class="pointer-events-none h-full w-full select-none object-cover"
		alt="hero"
	/>

	<div class="absolute bottom-0 left-0 w-full space-y-6 bg-black bg-opacity-50 p-8 text-white">
		<h5 class="text-6xl font-display">{establecimiento.nombre}</h5>

		<p class="text-xl max-w-screen-xl">{establecimiento.descripcion}</p>

		<div class="flex space-x-4">
			{#each establecimiento.tags as tag}
				<Badge variant="purple" class="text-base">{tag}</Badge>
			{/each}
		</div>
	</div>
</div>
