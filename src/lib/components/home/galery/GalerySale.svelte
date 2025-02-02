<script lang="ts">
	import type { Establecimiento } from '$lib/types/establecimiento';
	import * as Carousel from '$components/ui/carousel/index.js';
	import CardEstablecimiento from './CardEstablecimiento.svelte';

	const mockEstablecimientos = [
		'https://s3-alpha-sig.figma.com/img/8b94/32d0/490ea854379104bbe6537aaa0d492b65?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hKeYRLKmoWhRBvkFFKYvx50BkeHtfTcZB3RFwgnfiVyxJ4rareWcBGa9MO6UuVqahtOhopOn5BHc192CxEm-nvSSWWpx5RLEMJ1EhRY7WoULj1V3-whTAkDPlqKPNJTLU8zIdGBtoXZOcEjJalMQrmgIdVniZZv6iy6GHSRkBKud~oO~v8Wd49L25g8bIdBdwzPwnCboJ5wTnfaISZJ4kfCB8hGFe-jx5N-yYGdU2scH5friumMrO2wrc66d-HKTH6nYwremY76xDVFtW8ZpbKulWgG5Zrau648R0zotTVCTXv-GLi8ehU1cq~k79QGs545N8KgjlQtwZFH64wWkmw__',
		'https://s3-alpha-sig.figma.com/img/8b94/32d0/490ea854379104bbe6537aaa0d492b65?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hKeYRLKmoWhRBvkFFKYvx50BkeHtfTcZB3RFwgnfiVyxJ4rareWcBGa9MO6UuVqahtOhopOn5BHc192CxEm-nvSSWWpx5RLEMJ1EhRY7WoULj1V3-whTAkDPlqKPNJTLU8zIdGBtoXZOcEjJalMQrmgIdVniZZv6iy6GHSRkBKud~oO~v8Wd49L25g8bIdBdwzPwnCboJ5wTnfaISZJ4kfCB8hGFe-jx5N-yYGdU2scH5friumMrO2wrc66d-HKTH6nYwremY76xDVFtW8ZpbKulWgG5Zrau648R0zotTVCTXv-GLi8ehU1cq~k79QGs545N8KgjlQtwZFH64wWkmw__',
		'https://s3-alpha-sig.figma.com/img/8b94/32d0/490ea854379104bbe6537aaa0d492b65?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hKeYRLKmoWhRBvkFFKYvx50BkeHtfTcZB3RFwgnfiVyxJ4rareWcBGa9MO6UuVqahtOhopOn5BHc192CxEm-nvSSWWpx5RLEMJ1EhRY7WoULj1V3-whTAkDPlqKPNJTLU8zIdGBtoXZOcEjJalMQrmgIdVniZZv6iy6GHSRkBKud~oO~v8Wd49L25g8bIdBdwzPwnCboJ5wTnfaISZJ4kfCB8hGFe-jx5N-yYGdU2scH5friumMrO2wrc66d-HKTH6nYwremY76xDVFtW8ZpbKulWgG5Zrau648R0zotTVCTXv-GLi8ehU1cq~k79QGs545N8KgjlQtwZFH64wWkmw__'
	];
</script>

<div class="w-full space-y-8">
	<div class="">
		<Carousel.Root
			class="w-full"
			opts={{
				loop: true
			}}
		>
			<Carousel.Content class="-ml-4">
				{#each mockEstablecimientos as establecimiento}
					<Carousel.Item class="pl-4 md:basis-1/2 lg:basis-1/3">
						<div>
							<img
								class="h-[137px] w-[695px] rounded-sm object-cover"
								src={establecimiento}
								alt=""
							/>
						</div>
					</Carousel.Item>
				{/each}
			</Carousel.Content>
			<Carousel.Previous />
			<Carousel.Next />
		</Carousel.Root>
	</div>
</div>
