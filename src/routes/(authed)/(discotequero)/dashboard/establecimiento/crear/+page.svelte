<script lang="ts">
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Clock, Mail, MapPin, Phone, Tag } from 'lucide-svelte';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';

	let { data }: { data: PageData } = $props();
</script>

<div class="min-h-screen px-4 py-8">
	<div class="mx-auto max-w-4xl">
		<div class="mb-8">
			<h1 class="mb-2 text-3xl font-bold">Crear Establecimiento</h1>
			<p class="text-muted-foreground">
				Completa los detalles para agregar tu discoteca a nuestra plataforma
			</p>
		</div>

		<form class="space-y-8">
			<Card.Root>
				<Card.Header>
					<Card.Title class="flex items-center gap-2">
						<MapPin class="h-5 w-5" />
						Información Básica
					</Card.Title>
					<Card.Description>Ingresa los datos fundamentales de tu discoteca</Card.Description>
				</Card.Header>
				<Card.Content class="space-y-6">
					<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
						<div class="space-y-2">
							<Label for="name">Nombre del Establecimiento *</Label>
							<Input id="name" placeholder="Ingresa el nombre de la discoteca" required />
						</div>
						<div class="space-y-2">
							<Label for="phone">Número de Teléfono *</Label>
							<div class="relative">
								<Phone class="absolute left-3 top-3 h-4 w-4 text-gray-400" />
								<Input id="phone" type="tel" placeholder="+57 1234567" class="pl-10" required />
							</div>
						</div>
					</div>

					<div class="space-y-2">
						<Label for="address">Dirección *</Label>
						<Input id="address" placeholder="Ingresa la dirección completa" required />
					</div>

					<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
						<div class="space-y-2">
							<Label for="latitude">Latitud</Label>
							<Input id="latitude" type="number" step="any" placeholder="40.7128" />
						</div>
						<div class="space-y-2">
							<Label for="longitude">Longitud</Label>
							<Input id="longitude" type="number" step="any" placeholder="-74.0060" />
						</div>
						<div class="space-y-2">
							<Label for="email">Correo Electrónico</Label>
							<div class="relative">
								<Mail class="absolute left-3 top-3 h-4 w-4 text-gray-400" />
								<Input id="email" type="email" placeholder="contacto@discoteca.com" class="pl-10" />
							</div>
						</div>
					</div>

					<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
						<div class="space-y-2">
							<Label for="state">Estado *</Label>
							<Select.Root type="single">
								<Select.Trigger class="w-full">Selecciona el estado</Select.Trigger>
								<Select.Content>
									<Select.Item value="test">Test</Select.Item>
								</Select.Content>
							</Select.Root>
						</div>
						<div class="space-y-2">
							<Label for="municipality">Municipio *</Label>
							<Input id="municipality" placeholder="Ingresa ciudad/municipio" required />
						</div>
					</div>

					<div class="space-y-2">
						<Label for="description">Descripción</Label>
						<Textarea
							id="description"
							placeholder="Describe tu discoteca, el ambiente y lo que la hace especial..."
							class="min-h-[100px]"
						/>
					</div>
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title class="flex items-center gap-2">
						<Clock class="h-5 w-5" />
						Horarios de Funcionamiento
					</Card.Title>
					<Card.Description>
						Establece el horario de operación de tu discoteca para cada día de la semana
					</Card.Description>
				</Card.Header>
				<Card.Content>
					<!--
              <div class="space-y-4">
                {DAYS_OF_WEEK.map((day) => (
                  <div key={day} class="flex items-center gap-4 p-4 border rounded-lg">
                    <div class="flex items-center space-x-2 min-w-[120px]">
                      <Checkbox
                        id={`${day}-open`}
                        checked={operatingHours[day].isOpen}
                        onCheckedChange={(checked) => updateOperatingHours(day, "isOpen", checked as boolean)}
                      />
                      <Label for={`${day}-open`} class="font-medium">
                        {day}
                      </Label>
                    </div>

                    {operatingHours[day].isOpen && (
                      <div class="flex items-center gap-2 flex-1">
                        <Input
                          type="time"
                          value={operatingHours[day].openTime}
                          onChange={(e) => updateOperatingHours(day, "openTime", e.target.value)}
                          class="w-32"
                        />
                        <span class="text-gray-500">a</span>
                        <Input
                          type="time"
                          value={operatingHours[day].closeTime}
                          onChange={(e) => updateOperatingHours(day, "closeTime", e.target.value)}
                          class="w-32"
                        />
                      </div>
                    )}

                    {!operatingHours[day].isOpen && <span class="text-gray-500 italic">Cerrado</span>}
                  </div>
                ))}
              </div>
              -->
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title class="flex items-center gap-2">
						<Tag class="h-5 w-5" />
						Etiquetas y Características
					</Card.Title>
					<Card.Description>
						Selecciona etiquetas que describan las características y ambiente de tu discoteca
					</Card.Description>
				</Card.Header>
				<Card.Content>
					<!--
              <div class="space-y-4">
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {AVAILABLE_TAGS.map((tag) => (
                    <div key={tag} class="flex items-center space-x-2">
                      <Checkbox
                        id={tag}
                        checked={selectedTags.includes(tag)}
                        onCheckedChange={() => handleTagToggle(tag)}
                      />
                      <Label for={tag} class="text-sm font-normal cursor-pointer">
                        {tag}
                      </Label>
                    </div>
                  ))}
                </div>

                {selectedTags.length > 0 && (
                  <div class="mt-4">
                    <Label class="text-sm font-medium">Etiquetas Seleccionadas:</Label>
                    <div class="flex flex-wrap gap-2 mt-2">
                      {selectedTags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          class="cursor-pointer"
                          onClick={() => handleTagToggle(tag)}
                        >
                          {tag}
                          <X class="h-3 w-3 ml-1" />
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              -->
				</Card.Content>
			</Card.Root>

			<!--
          <Card.Root>
            <Card.Header>
              <Card.Title class="flex items-center gap-2">
                <Upload class="h-5 w-5" />
                Medios y Documentos
              </Card.Title>
              <Card.Description>Sube la imagen principal, fotos de galería y menú de tu discoteca</Card.Description>
            </Card.Header>
            <Card.Content class="space-y-6">
              <div class="space-y-2">
                <Label>Imagen Principal *</Label>
                <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  {mainImage ? (
                    <div class="space-y-2">
                      <ImageIcon class="h-8 w-8 mx-auto text-green-600" />
                      <p class="text-sm font-medium text-green-600">{mainImage.name}</p>
                      <Button type="button" variant="outline" size="sm" onClick={() => setMainImage(null)}>
                        Eliminar
                      </Button>
                    </div>
                  ) : (
                    <div class="space-y-2">
                      <ImageIcon class="h-8 w-8 mx-auto text-gray-400" />
                      <div>
                        <Label for="main-image" class="cursor-pointer text-blue-600 hover:text-blue-500">
                          Haz clic para subir imagen principal
                        </Label>
                        <p class="text-xs text-gray-500 mt-1">PNG, JPG hasta 10MB</p>
                      </div>
                    </div>
                  )}
                  <Input
                    id="main-image"
                    type="file"
                    accept="image/*"
                    onChange={handleMainImageUpload}
                    class="hidden"
                  />
                </div>
              </div>

              <Separator />

              <div class="space-y-2">
                <Label>Galería de Imágenes (Máx 5)</Label>
                <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <div class="space-y-2">
                    <ImageIcon class="h-8 w-8 mx-auto text-gray-400" />
                    <div>
                      <Label for="gallery-images" class="cursor-pointer text-blue-600 hover:text-blue-500">
                        Haz clic para subir imágenes de galería
                      </Label>
                      <p class="text-xs text-gray-500 mt-1">PNG, JPG hasta 10MB cada una</p>
                    </div>
                  </div>
                  <Input
                    id="gallery-images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleGalleryImageUpload}
                    class="hidden"
                    disabled={galleryImages.length >= 5}
                  />
                </div>

                {galleryImages.length > 0 && (
                  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
                    {galleryImages.map((file, index) => (
                      <div key={index} class="relative group">
                        <div class="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                          <ImageIcon class="h-8 w-8 text-gray-400" />
                        </div>
                        <p class="text-xs text-center mt-1 truncate">{file.name}</p>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          class="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeGalleryImage(index)}
                        >
                          <X class="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Separator />

              <div class="space-y-2">
                <Label>Menú (PDF)</Label>

                <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  {menuPdf ? (
                    <div class="space-y-2">
                      <FileText class="h-8 w-8 mx-auto text-red-600" />
                      <p class="text-sm font-medium text-red-600">{menuPdf.name}</p>
                      <Button type="button" variant="outline" size="sm" onClick={() => setMenuPdf(null)}>
                        Eliminar
                      </Button>
                    </div>
                  ) : (
                    <div class="space-y-2">
                      <FileText class="h-8 w-8 mx-auto text-gray-400" />
                      <div>
                        <Label for="menu-pdf" class="cursor-pointer text-blue-600 hover:text-blue-500">
                          Haz clic para subir menú PDF
                        </Label>
                        <p class="text-xs text-gray-500 mt-1">PDF hasta 10MB</p>
                      </div>
                    </div>
                  )}
                  <Input id="menu-pdf" type="file" accept=".pdf" onChange={handleMenuUpload} class="hidden" />
                </div>
              </div>
              </div>

            </Card.Content>
          </Card.Root>
          -->

			<div class="flex justify-end space-x-4">
				<Button type="button" variant="outline" size="lg">Guardar Borrador</Button>
				<Button type="submit" size="lg" class="min-w-[150px]">Crear Establecimiento</Button>
			</div>
		</form>
	</div>
</div>
