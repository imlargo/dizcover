<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import {
		Facebook,
		Linkedin,
		Instagram,
		Share2,
		Twitter,
		PhoneIcon as WhatsApp
	} from 'lucide-svelte';

	type Props = {
		title: string;
		description: string;
		shareUrl: string;
		size?: string;
	};

	const { title, description, shareUrl, size = '10' }: Props = $props();

	const encodedShareUrl = encodeURIComponent(shareUrl);

	async function shareOnInstagram() {
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

<div class="inline-flex">
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			<Button variant="ghost" class={`size-${size}`}>
				<Share2 />
			</Button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content>
			<DropdownMenu.Group>
				<DropdownMenu.Item>
					<a
						class="flex gap-2 items-center"
						href={`https://wa.me/?text=${encodedShareUrl}`}
						target="_blank"
					>
                    <i class="bi bi-whatsapp"></i>
						<span>WhatsApp</span>
					</a>
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					<a class="flex gap-2 items-center" onclick={shareOnInstagram}>
						<i class="bi bi-instagram"></i>
						<span>Instagram</span>
					</a>
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					<a
						class="flex gap-2 items-center"
						href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedShareUrl}`}
						target="_blank"
					>
                    <i class="bi bi-linkedin"></i>
						<span>Linkedin</span>
					</a>
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					<a
						class="flex gap-2 items-center"
						href={`https://www.facebook.com/sharer/sharer.php?u=${encodedShareUrl}`}
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
