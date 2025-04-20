<script lang="ts">
	import {
		Html5QrcodeScanner,
		Html5Qrcode,
		Html5QrcodeSupportedFormats,
		type Html5QrcodeResult
	} from 'html5-qrcode';
	import type { PageData } from './$types';
	import { onMount, tick } from 'svelte';
	import { Button } from '$lib/components/ui/button/index.js';

	type ScannerState =
		| 'uninitialized'
		| 'waiting_permission'
		| 'starting'
		| 'running'
		| 'success'
		| 'paused';

	let result = $state('');
	let scannerState = $state<ScannerState>('uninitialized');
	let html5QrCodeInstance: Html5Qrcode | null = null;

	let selectedCameraId = $state('');

	async function loadMediaDevices() {
		try {
			const devices = await Html5Qrcode.getCameras();
			if (devices && devices.length) {
				selectedCameraId = devices[0].id;
				return selectedCameraId;
			} else {
				return null;
			}
		} catch (error) {
			return null;
		}
	}

	function onScanSuccess(decodedText: string, decodedResult: Html5QrcodeResult) {
		result = decodedText;
		console.log(`Código QR escaneado: ${decodedText}`, decodedResult);

		scannerState = 'success';
		stopScanner();
	}

	function onScanError(error: string) {
		console.warn(`Error al escanear: ${error}`);
	}

	async function startScanner() {
		try {
			scannerState = 'waiting_permission';
			await loadMediaDevices();

			scannerState = 'starting';
			await tick();

			html5QrCodeInstance = new Html5Qrcode('reader', false);

			await html5QrCodeInstance.start(
				{ facingMode: 'environment' },
				{
					fps: 10,
					qrbox: { width: 384, height: 384 },
					aspectRatio: 1.0
				},
				onScanSuccess,
				onScanError
			);

			scannerState = 'running';

			console.log('Escáner QR iniciado');
		} catch (err) {
			console.error(`No se pudo iniciar el escáner: ${err}`);
		}
	}

	// Detener el escáner
	async function stopScanner() {
		if (html5QrCodeInstance !== null && html5QrCodeInstance.isScanning) {
			try {
				await html5QrCodeInstance.stop();
				console.log('Escáner QR detenido');
				scannerState = 'paused';
			} catch (error) {
				console.error(`Error al detener el escáner: ${error}`);
			}
		}
	}
</script>

<div class="flex w-full items-center justify-center p-12">
	<div class="flex items-center justify-center border p-4">
		<div class="flex flex-col gap-4">
			{#if scannerState === 'running' || scannerState === 'starting'}
				<div id="reader" class="size-96"></div>
			{:else}
				<div class="size-96">
					<div class="flex h-full w-full items-center justify-center rounded-lg bg-gray-200">
						{#if scannerState === 'waiting_permission'}
							<p class="text-gray-500">Esperando permiso de la cámara...</p>
						{:else if scannerState === 'paused'}
							<p class="text-gray-500">Escáner detenido</p>
						{:else}
							<p class="text-gray-500">Escáner no iniciado</p>
						{/if}
					</div>
				</div>
			{/if}

			<!--
			<div class="relative size-96 overflow-hidden rounded-lg border">
				<video class="size-96 object-cover" bind:this={videoElement} autoplay playsinline></video>
				<div class="border-2 border-purple-500 rounded-lg absolute top-1/2 left-1/2 w-[250px] h-[250px] -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none shadow-[0_0_0_99999px_rgba(0,0,0,0.5)]"></div>
			</div>
			-->

			<Button variant="secondary" onclick={startScanner}>Iniciar Escáner</Button>
			<Button variant="secondary" onclick={stopScanner}>Parar Escáner</Button>

			{#if result}
				<div class="flex flex-col gap-2">
					<p class="text-gray-500">Resultado:</p>
					<p class="text-gray-700">{result}</p>
				</div>
			{:else}
				<p class="text-gray-500">No se ha escaneado ningún código QR.</p>
			{/if}
		</div>
	</div>
</div>

<style>
</style>
