<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Share2 } from 'lucide-svelte';

	type Props = {
		title: string;
		description: string;
		shareUrl: string;
		size?: string;
	};

	const { title, description, shareUrl, size = '10' }: Props = $props();

	const prompt = `${title} ${description} ${shareUrl}`;

	async function shareOnMobile() {
		if (navigator.share) {
			try {
				await navigator.share({
					title: title,
					text: description,
					url: shareUrl
				});
				console.log('Compartido con éxito');
			} catch (error) {
				console.error('Error al compartir:', error);
			}
		} else {
			alert('La función de compartir por instagram no es compatible con tu dispositivo.');
		}
	}
</script>

<div class="inline-flex lg:hidden">
	<Button variant="ghost" class={`size-${size}`} onclick={shareOnMobile}>
		<Share2 />
	</Button>
</div>

<div class="hidden lg:inline-flex">
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			<Button variant="ghost" class={`size-${size}`}>
				<Share2 />
			</Button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content>
			<DropdownMenu.Group>
				<DropdownMenu.GroupHeading>Compartir</DropdownMenu.GroupHeading>
				<DropdownMenu.Separator />
				<DropdownMenu.Item>
					<a class="flex items-center gap-2" href={`https://wa.me/?text=${prompt}`} target="_blank">
						<i class="bi bi-whatsapp"></i>
						<span>WhatsApp</span>
					</a>
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					<a class="flex items-center gap-2" onclick={shareOnMobile}>
						<i class="bi bi-instagram"></i>
						<span>Instagram</span>
					</a>
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					<a
						class="flex items-center gap-2"
						href={`https://www.linkedin.com/sharing/share-offsite/?url=${prompt}`}
						target="_blank"
					>
						<i class="bi bi-linkedin"></i>
						<span>Linkedin</span>
					</a>
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					<a
						class="flex items-center gap-2"
						href={`https://www.facebook.com/sharer/sharer.php?u=${prompt}`}
						target="_blank"
					>
						<i class="bi bi-facebook"></i>
						<span>Facebook</span>
					</a>
				</DropdownMenu.Item>
			</DropdownMenu.Group>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</div>
