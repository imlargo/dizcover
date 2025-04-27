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
				if (scannerState != 'success') {
					scannerState = 'paused';
				}
			} catch (error) {
				console.error(`Error al detener el escáner: ${error}`);
			}
		}
	}
</script>

<main class="space-y-4 py-12 px-4">
	<h1 class="font-display w-full text-center text-2xl font-bold">Lee el código QR</h1>

	<div class="flex items-center justify-center p-4">
		<div class="flex flex-col gap-4">
			{#if scannerState === 'running' || scannerState === 'starting'}
				<div>
					<div id="reader" class="aspect-square h-72 md:h-96 w-auto overflow-hidden rounded-md"></div>
				</div>
			{:else}
				<div class="aspect-square h-72 md:h-96 w-auto overflow-hidden rounded-md">
					<div class="flex h-full w-full items-center justify-center rounded-lg bg-gray-200">
						{#if scannerState === 'waiting_permission'}
							<p class="text-gray-500">Esperando permiso de la cámara...</p>
						{:else if scannerState === 'paused'}
							<p class="text-gray-500">Escáner detenido</p>
						{:else if scannerState === 'success'}
							<p class="text-green-500">Código QR escaneado con éxito</p>
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

			<div class="flex flex-col gap-2">
				<Button class="bg-[#D400FE] font-semibold text-white" onclick={startScanner}
					>Iniciar Escáner</Button
				>
				<Button class="bg-neutral-700 font-semibold text-white" onclick={stopScanner}
					>Detener Escáner</Button
				>
			</div>

			{#if result}
				<div class="flex flex-col gap-2 text-center">
					<p class="text-gray-400">{result}</p>
				</div>
			{:else}
				<p class="text-center text-gray-500">No se ha escaneado ningún código QR.</p>
			{/if}
		</div>
	</div>
</main>
