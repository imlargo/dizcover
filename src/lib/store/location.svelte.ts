import { toast } from "svelte-sonner";

type Coordinates = {
	lat?: number;
	lng?: number;
};

class UserLocation {
	location: Coordinates = $state({
		lat: undefined,
		lng: undefined
	});
	accuracy: number = $state(0);
	watchID: number = $state(0);
	autorization: boolean = $state(false);

	requestLocation() {
		const onSuccess = (position: GeolocationPosition) => {
			const latitud = position.coords.latitude;
			const longitud = position.coords.longitude;

			this.location = {
				lat: latitud,
				lng: longitud
			}

			this.accuracy = position.coords.accuracy;
			this.autorization = true;
		}

		const onError = (error: GeolocationPositionError) => {
			this.autorization = false;
			switch (error.code) {
				case error.PERMISSION_DENIED:
					toast.error("El usuario denegó la solicitud de geolocalización");
					break;
				case error.POSITION_UNAVAILABLE:
					toast.error("La información de ubicación no está disponible");
					break;
				case error.TIMEOUT:
					toast.error("Se agotó el tiempo para obtener la ubicación");
					break;
				default:
					toast.error("Ocurrió un error desconocido");
					break;
			}
		}

		const options: PositionOptions = {
			enableHighAccuracy: true, // Solicitar alta precisión
			timeout: 5000,           // Tiempo máximo (ms) para obtener la ubicación
			maximumAge: 0            // No usar ubicaciones en caché
		}


		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
		}
	}

	startWatch() {
		const watchID = navigator.geolocation.watchPosition((position) => {
			this.autorization = true;
			this.location = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			}

			this.accuracy = position.coords.accuracy;
		});

		this.watchID = watchID;
	}

	stopWatch() {
		navigator.geolocation.clearWatch(this.watchID);
	}
}

export const storeLocation = new UserLocation();
