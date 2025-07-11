<script lang="ts">
	import { Button } from '$components/ui/button';
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$components/ui/card';
	import { Input } from '$components/ui/input';
	import { Label } from '$components/ui/label';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$components/ui/tabs';
	import { Checkbox } from '$components/ui/checkbox';
	import { Badge } from '$components/ui/badge';
	import { Alert, AlertTitle, AlertDescription } from '$components/ui/alert';
	import {
		Loader2,
		CreditCard,
		Smartphone,
		Building2,
		CheckCircle,
		XCircle,
		RefreshCw,
		ExternalLink
	} from 'lucide-svelte';
	import { PaymentController, WompiService } from '$lib/controllers/payments';
	import { onMount } from 'svelte';
	import type {
		BancolombiaTokenResponseData,
		CardTokenResponseData,
		NequiTokenResponseData
	} from '$lib/types/payments/tokenize';
	import { PaymentMethodType } from '$lib/types/models/payments';
	import { storeAuth } from '$lib/store/auth.svelte';

	interface ValidationErrors {
		cardNumber?: string;
		expirationMonth?: string;
		expirationYear?: string;
		cvc?: string;
		cardholderName?: string;
		phoneNumber?: string;
	}

	interface FormData {
		cardNumber: string;
		expirationMonth: string;
		expirationYear: string;
		cvc: string;
		cardholderName: string;
		phoneNumber: string;
	}

	let activeTab = $state('card');
	const formData = $state<FormData>({
		cardNumber: '',
		expirationMonth: '',
		expirationYear: '',
		cvc: '',
		cardholderName: '',
		phoneNumber: ''
	});

	let acceptanceTokensResponse = $state<AcceptanceTokensResponse>();
	const wompiPaymentService = new WompiService('pub_test_ie637PXpS3Z6YuEEk7utQ3RQFXmoNDel');
	async function getAcceptanceTokens() {
		const response = await wompiPaymentService.getAcceptanceTokens();
		acceptanceTokensResponse = response;
	}

	let errors = $state<ValidationErrors>({});
	let isLoading = $state(false);
	let isCheckingStatus = $state(false);
	let privacyConsent = $state(false);
	let dataConsent = $state(false);
	let submitStatus = $state<'idle' | 'success' | 'error'>('idle');
	let errorMessage = $state('');

	let bancolombiaRedirectUrl = $state<string>('');

	// Real-time validation functions
	const validateCardNumber = (cardNumber: string): string | undefined => {
		const cleaned = cardNumber.replace(/\s/g, '');
		if (!cleaned) return 'El número de tarjeta es requerido';
		if (!/^\d+$/.test(cleaned)) return 'El número de tarjeta solo debe contener dígitos';
		if (cleaned.length < 13 || cleaned.length > 19)
			return 'El número de tarjeta debe tener entre 13 y 19 dígitos';

		// Luhn algorithm validation
		let sum = 0;
		let isEven = false;
		for (let i = cleaned.length - 1; i >= 0; i--) {
			let digit = Number.parseInt(cleaned[i]);
			if (isEven) {
				digit *= 2;
				if (digit > 9) digit -= 9;
			}
			sum += digit;
			isEven = !isEven;
		}
		if (sum % 10 !== 0) return 'Número de tarjeta inválido';
		return undefined;
	};

	const validateExpirationMonth = (month: string): string | undefined => {
		if (!month) return 'El mes es requerido';
		const monthNum = Number.parseInt(month);
		if (monthNum < 1 || monthNum > 12) return 'Mes inválido';
		return undefined;
	};

	const validateExpirationYear = (year: string, month: string): string | undefined => {
		if (!year) return 'El año es requerido';
		const yearNum = Number.parseInt(year);
		return undefined;
	};

	const validateCVC = (cvc: string): string | undefined => {
		if (!cvc) return 'El CVC es requerido';
		if (!/^\d{3,4}$/.test(cvc)) return 'El CVC debe tener 3 o 4 dígitos';
		return undefined;
	};

	const validateCardholderName = (name: string): string | undefined => {
		if (!name.trim()) return 'El nombre del titular es requerido';
		if (name.trim().length < 2) return 'El nombre debe tener al menos 2 caracteres';
		if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/.test(name)) return 'El nombre solo debe contener letras';
		return undefined;
	};

	const validatePhoneNumber = (phone: string): string | undefined => {
		if (!phone) return 'El número de teléfono es requerido';
		return undefined;
	};

	// Real-time validation handlers
	const handleInputChange = (field: keyof FormData, value: string) => {
		formData[field] = value;

		let error: string | undefined;
		switch (field) {
			case 'cardNumber':
				error = validateCardNumber(value);
				break;
			case 'expirationMonth':
				error = validateExpirationMonth(value);
				break;
			case 'expirationYear':
				error = validateExpirationYear(value, formData.expirationMonth);
				break;
			case 'cvc':
				error = validateCVC(value);
				break;
			case 'cardholderName':
				error = validateCardholderName(value);
				break;
			case 'phoneNumber':
				error = validatePhoneNumber(value);
				break;
		}

		errors = {
			...errors,
			[field]: error
		};
	};

	// Format card number with spaces
	const formatCardNumber = (value: string) => {
		const cleaned = value.replace(/\s/g, '');
		const formatted = cleaned.replace(/(.{4})/g, '$1 ').trim();
		return formatted;
	};

	// Format phone number
	const formatPhoneNumber = (value: string) => {
		const cleaned = value.replace(/\D/g, '');
		if (cleaned.length <= 3) return cleaned;
		if (cleaned.length <= 6) return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
		return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 10)}`;
	};

	// Handle form submission
	const handleSubmit = async () => {
		if (!privacyConsent || !dataConsent) return;

		isLoading = true;
		submitStatus = 'idle';

		try {
			// Validate current tab
			let hasErrors = false;
			const newErrors: ValidationErrors = {};

			if (activeTab === 'card') {
				newErrors.cardNumber = validateCardNumber(formData.cardNumber);
				newErrors.expirationMonth = validateExpirationMonth(formData.expirationMonth);
				newErrors.expirationYear = validateExpirationYear(
					formData.expirationYear,
					formData.expirationMonth
				);
				newErrors.cvc = validateCVC(formData.cvc);
				newErrors.cardholderName = validateCardholderName(formData.cardholderName);

				hasErrors = Object.values(newErrors).some((error) => error !== undefined);
			} else if (activeTab === 'nequi') {
				newErrors.phoneNumber = validatePhoneNumber(formData.phoneNumber);
				hasErrors = newErrors.phoneNumber !== undefined;
			}

			errors = newErrors;

			if (hasErrors) {
				submitStatus = 'error';
				errorMessage = 'Por favor corrige los errores en el formulario';
				return;
			}

			let response: CardTokenResponseData | NequiTokenResponseData | BancolombiaTokenResponseData;

			const paymentController = new PaymentController();

			try {
				if (activeTab === 'card') {
					const resp = await wompiPaymentService.tokenCard({
						number: formData.cardNumber,
						cvc: formData.cvc,
						exp_month: formData.expirationMonth,
						exp_year: formData.expirationYear,
						card_holder: formData.cardholderName
					});

					const created = await paymentController.createPaymentMethod(
						PaymentMethodType.Card,
						resp.data.id,
						storeAuth.user?.email as unknown as string,
						acceptanceTokensResponse?.data.presigned_acceptance
							.acceptance_token as unknown as string,
						acceptanceTokensResponse?.data.presigned_personal_data_auth
							.acceptance_token as unknown as string
					);

					response = resp.data;
				} else if (activeTab === 'nequi') {
					const resp = await wompiPaymentService.tokenNequi({
						phone_number: formData.phoneNumber
					});

					const created = await paymentController.createPaymentMethod(
						PaymentMethodType.Nequi,
						resp.data.id,
						storeAuth.user?.email as unknown as string,
						acceptanceTokensResponse?.data.presigned_acceptance
							.acceptance_token as unknown as string,
						acceptanceTokensResponse?.data.presigned_personal_data_auth
							.acceptance_token as unknown as string
					);

					response = resp.data;
				} else if (activeTab === 'bancolombia') {
					const resp = await wompiPaymentService.tokenBancolombia({
						redirect_url: typeof window !== 'undefined' ? window.location.href : '', // Full url
						type_auth: 'TOKEN'
					});

					const created = await paymentController.createPaymentMethod(
						PaymentMethodType.Bancolombia,
						resp.data.id,
						storeAuth.user?.email as unknown as string,
						acceptanceTokensResponse?.data.presigned_acceptance
							.acceptance_token as unknown as string,
						acceptanceTokensResponse?.data.presigned_personal_data_auth
							.acceptance_token as unknown as string
					);

					response = resp.data;
				}

				submitStatus = 'success';
			} catch (error) {
				submitStatus = 'error';
				errorMessage = 'Error al registrar el método de pago. Inténtalo de nuevo.';
			}
		} catch (error) {
			submitStatus = 'error';
			errorMessage = 'Error inesperado. Inténtalo de nuevo.';
		} finally {
			isLoading = false;
		}
	};

	const canSubmit = $derived(privacyConsent && dataConsent && !isLoading);

	async function getBancolombiaRedirect() {
		const resp = await wompiPaymentService.tokenBancolombia({
			redirect_url: typeof window !== 'undefined' ? window.location.href : '', // Full url
			type_auth: 'TOKEN'
		});

		bancolombiaRedirectUrl = resp?.data?.authorization_url || '';
	}

	onMount(() => {
		getAcceptanceTokens();
		getBancolombiaRedirect();
	});
</script>

<Card class="shadow-xl">
	<CardHeader>
		<CardTitle>Registrar Método de Pago</CardTitle>
		<CardDescription>Selecciona y configura tu método de pago preferido</CardDescription>
	</CardHeader>
	<CardContent class="space-y-6">
		<Tabs bind:value={activeTab} class="w-full space-y-6">
			<TabsList class="w-full">
				<TabsTrigger value="card" class="flex w-full gap-x-2">
					<CreditCard class="size-4" />
					<span class="hidden sm:inline">Tarjeta</span>
				</TabsTrigger>
				<TabsTrigger value="nequi" class="flex w-full gap-x-2">
					<Smartphone class="size-4" />
					<span class="hidden sm:inline">Nequi</span>
				</TabsTrigger>
				<TabsTrigger value="bancolombia" class="flex w-full gap-x-2">
					<Building2 class="size-4" />
					<span class="hidden sm:inline">Bancolombia</span>
				</TabsTrigger>
			</TabsList>

			<TabsContent value="card" class="space-y-4">
				<div class="grid gap-4">
					<div class="space-y-2">
						<Label for="cardNumber">Número de Tarjeta *</Label>
						<Input
							id="cardNumber"
							placeholder="1234 5678 9012 3456"
							value={formatCardNumber(formData.cardNumber)}
							onchange={(e) =>
								handleInputChange('cardNumber', (e?.target?.value || '').replace(/\s/g, ''))}
							class={errors.cardNumber ? 'border-red-500' : ''}
							maxlength={23}
							aria-describedby={errors.cardNumber ? 'cardNumber-error' : undefined}
						/>
						{#if errors.cardNumber}
							<p id="cardNumber-error" class="text-sm text-red-600" role="alert">
								{errors.cardNumber}
							</p>
						{/if}
					</div>

					<div class="grid grid-cols-2 gap-4">
						<div class="space-y-2">
							<Label for="expirationMonth">Mes de Expiración *</Label>
							<Input
								id="expirationMonth"
								placeholder="MM"
								value={formData.expirationMonth}
								onchange={(e) => handleInputChange('expirationMonth', e?.target?.value || '')}
								class={errors.expirationMonth ? 'border-red-500' : ''}
								maxlength={2}
								aria-describedby={errors.expirationMonth ? 'expirationMonth-error' : undefined}
							/>
							{#if errors.expirationMonth}
								<p id="expirationMonth-error" class="text-sm text-red-600" role="alert">
									{errors.expirationMonth}
								</p>
							{/if}
						</div>
						<div class="space-y-2">
							<Label for="expirationYear">Año de Expiración *</Label>
							<Input
								id="expirationYear"
								placeholder="AAAA"
								value={formData.expirationYear}
								onchange={(e) => handleInputChange('expirationYear', e?.target?.value || '')}
								class={errors.expirationYear ? 'border-red-500' : ''}
								maxlength={2}
								aria-describedby={errors.expirationYear ? 'expirationYear-error' : undefined}
							/>
							{#if errors.expirationYear}
								<p id="expirationYear-error" class="text-sm text-red-600" role="alert">
									{errors.expirationYear}
								</p>
							{/if}
						</div>
					</div>

					<div class="grid grid-cols-2 gap-4">
						<div class="space-y-2">
							<Label for="cvc">CVC *</Label>
							<Input
								id="cvc"
								placeholder="123"
								value={formData.cvc}
								onchange={(e) => handleInputChange('cvc', e?.target?.value || '')}
								class={errors.cvc ? 'border-red-500' : ''}
								maxlength={4}
								aria-describedby={errors.cvc ? 'cvc-error' : undefined}
							/>
							{#if errors.cvc}
								<p id="cvc-error" class="text-sm text-red-600" role="alert">
									{errors.cvc}
								</p>
							{/if}
						</div>
						<div class="space-y-2">
							<Label for="cardholderName">Nombre del Titular *</Label>
							<Input
								id="cardholderName"
								placeholder="Juan Pérez"
								value={formData.cardholderName}
								onchange={(e) => handleInputChange('cardholderName', e?.target?.value || '')}
								class={errors.cardholderName ? 'border-red-500' : ''}
								aria-describedby={errors.cardholderName ? 'cardholderName-error' : undefined}
							/>
							{#if errors.cardholderName}
								<p id="cardholderName-error" class="text-sm text-red-600" role="alert">
									{errors.cardholderName}
								</p>
							{/if}
						</div>
					</div>
				</div>
			</TabsContent>

			<TabsContent value="nequi" class="space-y-4">
				<div class="space-y-4">
					<div class="space-y-2">
						<Label for="phoneNumber">Número de Teléfono *</Label>
						<Input
							id="phoneNumber"
							placeholder="300 123 4567"
							value={formatPhoneNumber(formData.phoneNumber)}
							onchange={(e) =>
								handleInputChange('phoneNumber', (e?.target?.value || '').replace(/\D/g, ''))}
							class={errors.phoneNumber ? 'border-red-500' : ''}
							maxlength={12}
							aria-describedby={errors.phoneNumber ? 'phoneNumber-error' : undefined}
						/>
						{#if errors.phoneNumber}
							<p id="phoneNumber-error" class="text-sm text-red-600" role="alert">
								{errors.phoneNumber}
							</p>
						{/if}
					</div>
				</div>
			</TabsContent>

			<TabsContent value="bancolombia" class="space-y-4">
				<div class="space-y-4 text-center">
					<div class="rounded-lg bg-dizcover-primary/5 p-6">
						<Building2 class="mx-auto mb-4 h-12 w-12 font-semibold" />
						<h3 class="mb-2 text-lg font-semibold">Autorizacion Bancolombia</h3>
						<p class="mb-4">
							Serás redirigido a Bancolombia para autorizar el registro de tu método de pago.
						</p>
						<Button
							href={bancolombiaRedirectUrl}
							disabled={isLoading}
							variant="link"
							class="w-full sm:w-auto"
							target="_blank"
						>
							{#if isLoading}
								<Loader2 class="mr-2 size-4 animate-spin" />
								Procesando...
							{:else}
								<ExternalLink class="mr-2 size-4" />
								Iniciar Autorizacion
							{/if}
						</Button>
					</div>
				</div>
			</TabsContent>
		</Tabs>

		<div class="space-y-4 border-t pt-6">
			<h3 class="text-lg font-semibold">Consentimientos Requeridos</h3>

			<div class="space-y-3">
				<div class="flex items-start space-x-3">
					<Checkbox
						id="privacy-consent"
						bind:checked={privacyConsent}
						aria-describedby="privacy-consent-description"
					/>
					<div class="space-y-1">
						<Label
							for="privacy-consent"
							class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							Acepto la Política de Privacidad *
						</Label>

						<p id="privacy-consent-description" class="text-sm">
							He leído y acepto los términos de la{' '}
							<a
								href={acceptanceTokensResponse?.data?.presigned_acceptance?.permalink}
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center gap-1 font-semibold hover:underline"
							>
								Política de Privacidad
								<ExternalLink class="h-3 w-3" />
							</a>
						</p>
					</div>
				</div>

				<div class="flex items-start space-x-3">
					<Checkbox
						id="data-consent"
						bind:checked={dataConsent}
						aria-describedby="data-consent-description"
					/>
					<div class="space-y-1">
						<Label
							for="data-consent"
							class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							Autorizo el tratamiento de mis datos *
						</Label>
						<p id="data-consent-description" class="text-sm">
							Autorizo el tratamiento de mis datos personales según el{' '}
							<a
								href={acceptanceTokensResponse?.data?.presigned_personal_data_auth?.permalink}
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center gap-1 font-semibold hover:underline"
							>
								Consentimiento de Datos
								<ExternalLink class="h-3 w-3" />
							</a>
						</p>
					</div>
				</div>
			</div>
		</div>

		{#if submitStatus === 'success'}
			<Alert class="border-dizcover-secondary/50 bg-dizcover-secondary/5">
				<CheckCircle class="size-4" />
				<AlertTitle>¡Método de pago registrado exitosamente!</AlertTitle>
			</Alert>
		{/if}

		{#if submitStatus === 'error'}
			<Alert variant="destructive">
				<XCircle class="size-4" />
				<AlertTitle>Error</AlertTitle>
				<AlertDescription>{errorMessage}</AlertDescription>
			</Alert>
		{/if}

		<Button onclick={handleSubmit} disabled={!canSubmit} class="w-full" size="lg">
			{#if isLoading}
				<Loader2 class="mr-2 size-4 animate-spin" />
				Registrando...
			{:else}
				Registrar Método de Pago
			{/if}
		</Button>

		<p class="text-center text-xs">* Campos obligatorios</p>
	</CardContent>
</Card>
