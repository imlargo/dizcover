<script lang="ts">
	import { Html5QrcodeScanner, Html5Qrcode, Html5QrcodeSupportedFormats, type Html5QrcodeResult } from 'html5-qrcode';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button/index.js';

	let result = $state('');
	let scannerInit = $state(false);
	let hasPermission = $state(false);
	let html5QrCodeInstance = null;

	let videoElement: HTMLVideoElement;
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

	async function startVideo(cameraId: string) {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: { deviceId: { exact: cameraId } }
			});

			return stream;
		} catch (err) {
			console.error('Error al iniciar el video:', err);
			throw err;
		}
	}

	function onScanSuccess(decodedText: string, decodedResult: Html5QrcodeResult) {
		result = decodedText;
		console.log(`Código QR escaneado: ${decodedText}`, decodedResult);
	}

	function onScanError(error: string) {
		console.warn(`Error al escanear: ${error}`);
	}

	async function startScanner() {
		try {
			await loadMediaDevices();

			html5QrCodeInstance = new Html5Qrcode('reader', false);

			const config = {
				fps: 10,
				qrbox: { width: 384, height: 384 },
				aspectRatio: 1.0,
				rememberLastUsedCamera: true,
				showTorchButtonIfSupported: true,
				formatsToSupport: [ Html5QrcodeSupportedFormats.QR_CODE ]
			};

			// Iniciar el escáner con la cámara seleccionada
			await html5QrCodeInstance.start({ facingMode: "environment" }, config, onScanSuccess, onScanError);

			console.log('Escáner QR iniciado');
		} catch (err) {
			console.error(`No se pudo iniciar el escáner: ${err}`);
			alert(`Error al iniciar el escáner: ${err}`);
			// Limpieza en caso de error
			if (videoElement.srcObject) {
				videoElement.srcObject.getTracks().forEach((track) => track.stop());
				videoElement.srcObject = null;
			}
		}
	}

	// Detener el escáner
	function stopScanner() {
		/*
		if (html5QrCode !== null && html5QrCode.isScanning) {
			html5QrCode
				.stop()
				.then(() => {
					console.log('Escáner QR detenido');
					// Detener el video
					if (videoElement.srcObject) {
						videoElement.srcObject.getTracks().forEach((track) => track.stop());
						videoElement.srcObject = null;
					}

					videoContainer.style.display = 'none';
					readerElement.style.display = 'block';

					startButton.disabled = false;
					stopButton.disabled = true;
					cameraSelect.disabled = false;
					statusElement.textContent = 'Escáner detenido';
				})
				.catch((err) => {
					console.error(`Error al detener el escáner: ${err}`);
					statusElement.textContent = `Error al detener: ${err.message}`;
				});
		}
				*/
	}
</script>

<div class="flex w-full items-center justify-center p-12">
	<div class="flex items-center justify-center border p-4">
		<div class="flex flex-col gap-4">
			<div id="reader" class="size-96"></div>

			<!--
			<div class="relative size-96 overflow-hidden rounded-lg border">
				<video class="size-96 object-cover" bind:this={videoElement} autoplay playsinline></video>
				<div class="border-2 border-purple-500 rounded-lg absolute top-1/2 left-1/2 w-[250px] h-[250px] -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none shadow-[0_0_0_99999px_rgba(0,0,0,0.5)]"></div>
			</div>
			-->

			<Button variant="secondary" onclick={startScanner}>Iniciar Escáner</Button>
		</div>
	</div>
</div>

<style>
</style>
