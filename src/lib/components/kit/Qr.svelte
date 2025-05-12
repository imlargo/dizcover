<script lang="ts">
	import QRCode from 'qrcode';

	type Props = {
		content: string;
		size?: 'sm' | 'md' | 'lg' | 'xl';
		class?: string;
	};

	const { content, class: className = '', size = 'md' }: Props = $props();

	const sizes = {
		sm: 128,
		md: 192,
		lg: 256,
		xl: 320
	};

	function useCanvasQr(element: HTMLCanvasElement) {
		QRCode.toCanvas(element, content, {
			width: sizes[size]
		});
	}
</script>

<canvas class={className} use:useCanvasQr id="canvas"></canvas>
