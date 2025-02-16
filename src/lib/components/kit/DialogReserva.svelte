<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
	import { Label } from '$lib/components/ui/label/index.js';

	let isOpen = $state(false);
	let numPersonas = $state(1);
	let basePrice = 10000;

	let totalPrice = $derived(basePrice * numPersonas);
</script>

<Dialog.Root>
	<Dialog.Trigger>
		<Button>Reservar</Button>
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title class="text-center text-black">Reservar</Dialog.Title>
			<Dialog.Description class="text-center">Elije el numero de personas</Dialog.Description>
		</Dialog.Header>

		<div class="flex flex-col items-center justify-center space-y-6 text-black py-8">
			
			<div class="flex items-center space-x-3 rounded">
                <i class="bi bi-person"></i>
				<Button class="size-8 rounded-full border" onclick={() => numPersonas--} variant="ghost"
					><i class="bi bi-dash"></i></Button
				>
				<span>{numPersonas}</span>
				<Button class="size-8 rounded-full border" onclick={() => numPersonas++} variant="ghost"
					><i class="bi bi-plus"></i></Button
				>
			</div>

			<div>
				<span>
                    <span class="font-semibold">Total: </span>
                    <span>${totalPrice}</span>
                </span>
			</div>

			<div class="flex flex-col space-y-4">
				<span class="font-semibold w-full text-center block">Elige un metodo de pago</span>

				<RadioGroup.Root class="grid grid-cols-2 justify-between gap-4">
					<div class="flex items-center space-x-2">
						<Label for="r1">
                            <img class="h-16" src="https://s3-alpha-sig.figma.com/img/c66b/29a1/529ab11c9b9f7677ae62eb86acded238?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=GexkDB1s0XTSPz5bJk99LH5NgSpFXvURuDSoBHRVAewyqXBec7a939rJ4m4v6N-p4aUn-CVL0wa01ruC3MfAGAsURPWYsvQ6QQU4bfaJD47CH5ygE3w9qNf-NhfA1gBPfvlfPbxps78FLdyzxp5Wu1Ek71ykmZxIo4zbZK~k-rFVbvz25DKapRSqyNHJrSgtpDwka5O1KfvcPSrrdAzp~aR2DjdcoPeGXNloK9gz6VSq-tffbr8eI~blQU8AzS8Mxb~tTmCeXHByQpS9WfwGbprgdDgl47O9ocdkthy7nOve~AWwkRpTuKZQSTJ71ljUitKW5z8r~0ACFXD77MxlMg__" alt="">
                        </Label>
                        <RadioGroup.Item value="default" id="r1" />
					</div>
					<div class="flex items-center space-x-2">
						<Label for="r2">
                            <img class="h-16" src="https://s3-alpha-sig.figma.com/img/5d15/82a2/561858ae929353566fe43cce318dd56c?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=OdKBN9tFUpzXYVqJmZbx6lNo-K~155iGp8O2VyS5bOcqWe4U4ZntZR7kjlYPYwuFNynZpm64a~jdhGViS68TNwdy5i4wlbJGMzY1I9vDEStje6ZX1M2iyKBfZ4pmO1kykaGFtl4ui1OfXIyP8oiFDY-oH3UIGFFxDrMdDbN3eirroygxjIZyEMkpm4BlO9~cAcT~8U28WpREuHx5Wwz8TJcn2nspnBbDEs7~K0ehTLL1nppTEsfLzNaqoH8PbA1woRiDfdkrLDsZhEEpqb91x4UhIzIxQue2h-V7r6FkkTPjNAn~n7ziG3ZZAtFT6z6wmK1p25B3~rSnPu8aKn5lFg__" alt="">
                        </Label>
                        <RadioGroup.Item value="comfortable" id="r2" />
					</div>
				</RadioGroup.Root>
			</div>
		</div>

		<Dialog.Footer>
			<Button type="submit" variant="secondary">Cancelar</Button>
			<Button type="submit">Reservar</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>

<style>
</style>
