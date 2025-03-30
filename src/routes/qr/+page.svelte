<script lang="ts">
	import { Html5QrcodeScanner, type Html5QrcodeResult } from 'html5-qrcode';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

    let showReader = $state(true);
	let result: string = $state('');
	let html5QrcodeScanner: Html5QrcodeScanner;

	function onScanSuccess(decodedText: string, decodedResult: Html5QrcodeResult) {
		console.log(`Scan result: ${decodedText}`, decodedResult);
		result = decodedText;
        showReader = false;
		html5QrcodeScanner.clear();
	}

	function onScanError(errorMessage: string) {
		// console.log(`Error scanning: ${errorMessage}`);
	}

	function useQrCode(element: HTMLDivElement) {
		html5QrcodeScanner = new Html5QrcodeScanner(element.id, { fps: 10, qrbox: 250 }, false);
		html5QrcodeScanner.render(onScanSuccess, onScanError);

		return {
			destroy() {
				html5QrcodeScanner.clear();
			}
		};
	}
</script>

<div class="flex w-full items-center justify-center p-12">
    {#if showReader}
	<div use:useQrCode class="h-[500px] w-[500px]" id="reader"></div>
    {/if}
	<div>
		{#if result !== ''}
			<span>
				<span>Resultado: </span>
				<span>{result}</span>
			</span>
		{/if}
	</div>
</div>
