<script lang="ts">
	import * as Carousel from '$components/ui/carousel/index.js';

	const mockDescuentos = [
		'https://s3-alpha-sig.figma.com/img/8b94/32d0/490ea854379104bbe6537aaa0d492b65?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=nFPZt-5hWWiotp3TXP2O3wYjVtYQJUhgT2~7Vnt~ZWZ8E1AOc3CBRf8zuqnZLprmU0fpH-RUsZ2ZAa2judhVwJqmVQQV~zE2J5DBQ~IpHT6XbRK~0r35R9jsea5disEsKfQLqY1AVtjKD46-OpZ-RHThtnS7OGsEOmN-T8RSahRHENDZgr0GJA2TxQCIEb~gXuJePtTepMwZQ2D~CJ75Ss7tQqjDNHtINHIYjWq6IP8nJzmk~~gVZkNlKycE0ZW5VeNxNn9-v4EHSe6FeU23LieqPevoGuVbLofRhLHBWzgz091jjS9Jzg6s3zjGDNVED-glWiDAPpyOgq~JzZjNqA__',
		'https://s3-alpha-sig.figma.com/img/8b94/32d0/490ea854379104bbe6537aaa0d492b65?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=nFPZt-5hWWiotp3TXP2O3wYjVtYQJUhgT2~7Vnt~ZWZ8E1AOc3CBRf8zuqnZLprmU0fpH-RUsZ2ZAa2judhVwJqmVQQV~zE2J5DBQ~IpHT6XbRK~0r35R9jsea5disEsKfQLqY1AVtjKD46-OpZ-RHThtnS7OGsEOmN-T8RSahRHENDZgr0GJA2TxQCIEb~gXuJePtTepMwZQ2D~CJ75Ss7tQqjDNHtINHIYjWq6IP8nJzmk~~gVZkNlKycE0ZW5VeNxNn9-v4EHSe6FeU23LieqPevoGuVbLofRhLHBWzgz091jjS9Jzg6s3zjGDNVED-glWiDAPpyOgq~JzZjNqA__',
		'https://s3-alpha-sig.figma.com/img/8b94/32d0/490ea854379104bbe6537aaa0d492b65?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=nFPZt-5hWWiotp3TXP2O3wYjVtYQJUhgT2~7Vnt~ZWZ8E1AOc3CBRf8zuqnZLprmU0fpH-RUsZ2ZAa2judhVwJqmVQQV~zE2J5DBQ~IpHT6XbRK~0r35R9jsea5disEsKfQLqY1AVtjKD46-OpZ-RHThtnS7OGsEOmN-T8RSahRHENDZgr0GJA2TxQCIEb~gXuJePtTepMwZQ2D~CJ75Ss7tQqjDNHtINHIYjWq6IP8nJzmk~~gVZkNlKycE0ZW5VeNxNn9-v4EHSe6FeU23LieqPevoGuVbLofRhLHBWzgz091jjS9Jzg6s3zjGDNVED-glWiDAPpyOgq~JzZjNqA__',
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
				{#each mockDescuentos as sale}
					<Carousel.Item class="pl-4 md:basis-1/2 lg:basis-1/3">
						<div class="bg-white/5 rounded-lg overflow-hidden">
							<img
								class="h-[137px] w-[695px] object-cover border-none"
								src={sale}
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
