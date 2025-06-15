<script lang="ts">
	import { Button } from '$components/ui/button';
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$components/ui/card';
	import { Input } from '$components/ui/input';
	import { Label } from '$components/ui/label';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$components/ui/tabs';
	import { Checkbox } from '$components/ui/checkbox';
	import { Badge } from '$components/ui/badge';
	import { Alert, AlertDescription } from '$components/ui/alert';
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

	let errors = $state<ValidationErrors>({});
	let isLoading = $state(false);
	let nequiStatus = $state<'PENDING' | 'APPROVED' | null>(null);
	let isCheckingStatus = $state(false);
	let privacyConsent = $state(false);
	let dataConsent = $state(false);
	let submitStatus = $state<'idle' | 'success' | 'error'>('idle');
	let errorMessage = $state('');

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
		const currentYear = new Date().getFullYear();
		const currentMonth = new Date().getMonth() + 1;

		if (yearNum < currentYear) return 'La tarjeta ha expirado';
		if (yearNum === currentYear && month && Number.parseInt(month) < currentMonth) {
			return 'La tarjeta ha expirado';
		}
		if (yearNum > currentYear + 20) return 'Año inválido';
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
		const cleaned = phone.replace(/\D/g, '');
		if (cleaned.length !== 10) return 'El número debe tener 10 dígitos';
		if (!cleaned.startsWith('3')) return 'Número de celular inválido';
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
        }
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

	// Check Nequi tokenization status
	const checkNequiStatus = async () => {
		isCheckingStatus = true;
		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 2000));
			nequiStatus = Math.random() > 0.5 ? 'APPROVED' : 'PENDING';
		} catch (error) {
			console.error('Error checking status:', error);
		} finally {
			isCheckingStatus = false;
		}
	};

	// Handle Bancolombia tokenization
	const handleBancolombiaTokenization = () => {
		isLoading = true;
		// Simulate redirection delay
		setTimeout(() => {
			isLoading = false;
			alert('Redirigiendo a Bancolombia para autorización...');
		}, 1000);
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
				hasErrors = newErrors.phoneNumber !== undefined || nequiStatus !== 'APPROVED';
			}

			errors = newErrors;

			if (hasErrors) {
				submitStatus = 'error';
				errorMessage = 'Por favor corrige los errores en el formulario';
				return;
			}

			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 2000));

			if (Math.random() > 0.2) {
				// 80% success rate
				submitStatus = 'success';
			} else {
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

	const canSubmit = privacyConsent && dataConsent && !isLoading;
</script>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
	<div class="mx-auto max-w-2xl">
		<Card class="shadow-xl">
			<CardHeader class="text-center">
				<CardTitle class="text-2xl font-bold text-gray-900">Registrar Método de Pago</CardTitle>
				<CardDescription class="text-gray-600">
					Selecciona y configura tu método de pago preferido
				</CardDescription>
			</CardHeader>
			<CardContent class="space-y-6">
				<Tabs bind:value={activeTab} class="w-full">
					<TabsList class="grid w-full grid-cols-3">
						<TabsTrigger value="card" class="flex items-center gap-2">
							<CreditCard class="h-4 w-4" />
							<span class="hidden sm:inline">Tarjeta</span>
						</TabsTrigger>
						<TabsTrigger value="nequi" class="flex items-center gap-2">
							<Smartphone class="h-4 w-4" />
							<span class="hidden sm:inline">Nequi</span>
						</TabsTrigger>
						<TabsTrigger value="bancolombia" class="flex items-center gap-2">
							<Building2 class="h-4 w-4" />
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
										handleInputChange('cardNumber', (e?.target?.value || "").replace(/\s/g, ''))}
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
										onchange={(e) => handleInputChange('expirationMonth', (e?.target?.value || ""))}
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
										onchange={(e) => handleInputChange('expirationYear', (e?.target?.value || ""))}
										class={errors.expirationYear ? 'border-red-500' : ''}
										maxlength={4}
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
										onchange={(e) => handleInputChange('cvc', (e?.target?.value || ""))}
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
										onchange={(e) => handleInputChange('cardholderName', (e?.target?.value || ""))}
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
										handleInputChange('phoneNumber', (e?.target?.value || "").replace(/\D/g, ''))}
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

							{#if formData.phoneNumber && !errors.phoneNumber}
								<div class="space-y-3">
									<div class="flex items-center justify-between">
										<Label>Estado de Tokenización</Label>
										<Button
											variant="outline"
											size="sm"
											onclick={checkNequiStatus}
											disabled={isCheckingStatus}
											class="flex items-center gap-2"
										>
											{#if isCheckingStatus}
												<Loader2 class="h-4 w-4 animate-spin" />
											{:else}
												<RefreshCw class="h-4 w-4" />
											{/if}
											Verificar Estado
										</Button>
									</div>

									{#if nequiStatus}
										<div class="flex items-center gap-2">
											{#if nequiStatus === 'APPROVED'}
												<CheckCircle class="h-5 w-5 text-green-600" />
												<Badge variant="default" class="bg-green-100 text-green-800">
													APROBADO
												</Badge>
											{:else}
												<XCircle class="h-5 w-5 text-yellow-600" />
												<Badge variant="secondary" class="bg-yellow-100 text-yellow-800">
													PENDIENTE
												</Badge>
											{/if}
										</div>
									{/if}
								</div>
							{/if}
						</div>
					</TabsContent>

					<TabsContent value="bancolombia" class="space-y-4">
						<div class="space-y-4 text-center">
							<div class="rounded-lg bg-blue-50 p-6">
								<Building2 class="mx-auto mb-4 h-12 w-12 text-blue-600" />
								<h3 class="mb-2 text-lg font-semibold text-gray-900">Tokenización Bancolombia</h3>
								<p class="mb-4 text-gray-600">
									Serás redirigido a Bancolombia para autorizar el registro de tu método de pago.
								</p>
								<Button
									onclick={handleBancolombiaTokenization}
									disabled={isLoading}
									class="w-full sm:w-auto"
								>
									{#if isLoading}
										<Loader2 class="mr-2 h-4 w-4 animate-spin" />
										Procesando...
									{:else}
										<ExternalLink class="mr-2 h-4 w-4" />
										Iniciar Tokenización
									{/if}
								</Button>
							</div>
						</div>
					</TabsContent>
				</Tabs>

				<div class="space-y-4 border-t pt-6">
					<h3 class="text-lg font-semibold text-gray-900">Consentimientos Requeridos</h3>

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
								<p id="privacy-consent-description" class="text-sm text-gray-600">
									He leído y acepto los términos de la{' '}
									<a
										href="/privacy-policy.pdf"
										target="_blank"
										rel="noopener noreferrer"
										class="inline-flex items-center gap-1 text-blue-600 hover:underline"
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
								<p id="data-consent-description" class="text-sm text-gray-600">
									Autorizo el tratamiento de mis datos personales según el{' '}
									<a
										href="/data-consent.pdf"
										target="_blank"
										rel="noopener noreferrer"
										class="inline-flex items-center gap-1 text-blue-600 hover:underline"
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
					<Alert class="border-green-200 bg-green-50">
						<CheckCircle class="h-4 w-4 text-green-600" />
						<AlertDescription class="text-green-800"
							>¡Método de pago registrado exitosamente!</AlertDescription
						>
					</Alert>
				{/if}

				{#if submitStatus === 'error'}
					<Alert class="border-red-200 bg-red-50">
						<XCircle class="h-4 w-4 text-red-600" />
						<AlertDescription class="text-red-800">{errorMessage}</AlertDescription>
					</Alert>
				{/if}

				<Button onclick={handleSubmit} disabled={!canSubmit} class="w-full" size="lg">
					{#if isLoading}
						<Loader2 class="mr-2 h-4 w-4 animate-spin" />
						Registrando...
					{:else}
						Registrar Método de Pago
					{/if}
				</Button>

				<p class="text-center text-xs text-gray-500">* Campos obligatorios</p>
			</CardContent>
		</Card>
	</div>
</div>
