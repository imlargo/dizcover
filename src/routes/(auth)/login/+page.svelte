<script lang="ts">
	import type { PageData } from './$types';
	import { LoaderCircle, Lock, User } from 'lucide-svelte';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { onMount } from 'svelte';
	import { invalidateAll } from '$app/navigation';
	import { toast } from 'svelte-sonner';
	import { apiBaseUrl } from '$lib/constants';

	type LoginForm = {
		email: string;
		password: string;
	};

	let isLoading = $state(false);
	let form: HTMLFormElement;
	const formData: LoginForm = $state({
		email: '',
		password: ''
	});

	async function onsubmit() {
		isLoading = true;

		if (!formData.email || !formData.password) {
			toast.error('Por favor, rellena todos los campos');
			return;
		}

		const d: Record<string, string> = {
			email: formData.email,
			password: formData.password
		};

		const form = document.createElement('form');
		form.method = 'POST';

		for (const key in d) {
			const input = document.createElement('input');
			input.type = 'hidden';
			input.name = key;
			input.value = d[key];
			form.appendChild(input);
		}

		document.body.appendChild(form);
		form.submit();
	}

	/*
	 * Create form to request access token from Google's OAuth 2.0 server.
	 */
	function oauthSignIn() {
		window.location.href = `${apiBaseUrl}/accounts/google/login`;
	}

	onMount(async () => {
		await invalidateAll();
	});
</script>

<div class="mx-auto w-full max-w-md p-4 lg:py-24">
	<Card.Root class="text-primary">
		<Card.Header class="space-y-1 text-center">
			<div class="flex items-center justify-center">
				<img src="/dizcover-logo.png" alt="" class="h-10">
			</div>
			<Card.Description class="text-muted-foreground"
				>Inicia sesión con tu correo o con tu usuario</Card.Description
			>
		</Card.Header>
		<Card.Content>
			<form {onsubmit} class="space-y-4">
				<div class="relative">
					<User class="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						placeholder="Correo o usuario"
						class="pl-10"
						bind:value={formData.email}
					/>
				</div>
				<div class="relative">
					<Lock class="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						type="password"
						placeholder="Contraseña"
						class="pl-10"
						bind:value={formData.password}
					/>
				</div>

				<Button class="w-full bg-[#D400FE] hover:bg-[#D400FE]/80 font-semibold text-primary" type="submit" disabled={isLoading}>
					{#if isLoading}
						<span>Iniciando sesión...</span>
						<i class="bi bi-arrow-repeat animate-spin leading-none"></i>
					{:else}
						<span>Continuar</span>
					{/if}
				</Button>
			</form>

			<div class="mt-4 text-center">
				<a href="/forgot-password" class="text-sm text-primary hover:underline">
					Olvidé mi contraseña
				</a>
			</div>

			<div class="relative my-6">
				<div class="absolute inset-0 flex items-center">
					<Separator class="w-full" />
				</div>
				<div class="relative flex justify-center">
					<span class="text-muted-foreground bg-background px-2 text-sm">ó</span>
				</div>
			</div>

			<div class="space-y-3">
				<Button
					variant="outline"
					class="w-full"
					disabled={isLoading}
					onclick={oauthSignIn}
				>
					{#if isLoading}
						<LoaderCircle class="animate-spin" />
					{:else}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height="24"
							viewBox="0 0 24 24"
							width="24"
							class="mr-2 h-5 w-5"
						>
							<path
								d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
								fill="#4285F4"
							/>
							<path
								d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
								fill="#34A853"
							/>
							<path
								d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
								fill="#FBBC05"
							/>
							<path
								d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
								fill="#EA4335"
							/>
							<path d="M1 1h22v22H1z" fill="none" />
						</svg>
					{/if}
					<span>Continuar con Google</span>
				</Button>
			</div>
		</Card.Content>
		<Card.Footer class="flex justify-center">
			<a href="/register" class="text-sm text-primary hover:underline">Regístrate</a>
		</Card.Footer>
	</Card.Root>
</div>
