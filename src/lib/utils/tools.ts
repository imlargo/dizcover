export function getInitials(name?: string): string {
	if (!name || typeof name !== 'string') return '';

	const names = name.trim().split(/\s+/);
	if (!names.length) return '';

	if (names.length === 1) {
		return name.length > 1 ? name.slice(0, 2).toUpperCase() : name.toUpperCase();
	}

	return names
		.slice(0, 2)
		.map((part) => part[0])
		.join('')
		.toUpperCase();
}
export function calculateProgress(
	current: number | null | undefined,
	total: number | null | undefined
): number {
	if (current === null || current === undefined) return 0;
	if (total === null || total === undefined) return 0;
	if (total === 0 && current === 0) return 0;
	if (total <= 0) return 0;
	if (current <= 0) return 0;
	if (current > total) return 100;

	return Math.round((current / total) * 100);
}

/**
 * Crea un objeto FormData a partir de un objeto de datos
 * Maneja correctamente diferentes tipos de valores (string, Blob, File)
 * @param data Objeto con los datos para el FormData
 * @returns Objeto FormData con los datos procesados
 */
export function createFormData(data: Record<string, unknown>): FormData {
	const formData = new FormData();

	Object.entries(data).forEach(([key, value]) => {
		// Ignorar valores undefined o null
		if (value === undefined || value === null) {
			return;
		}

		// Manejar correctamente los diferentes tipos de valores
		if (typeof value === 'string' || value instanceof Blob || value instanceof File) {
			formData.append(key, value);
		} else if (Array.isArray(value)) {
			// Para arrays, añadir cada elemento con el mismo nombre de clave
			value.forEach((item) => {
				if (item !== undefined && item !== null) {
					formData.append(key, item instanceof Blob || item instanceof File ? item : String(item));
				}
			});
		} else if (value instanceof Date) {
			// Convertir fechas a ISO string
			formData.append(key, value.toISOString());
		} else if (typeof value === 'object') {
			// Para objetos, convertir a JSON
			formData.append(key, JSON.stringify(value));
		} else {
			// Para otros tipos primitivos (number, boolean), convertir a string
			formData.append(key, String(value));
		}
	});

	return formData;
}

export function toQueryParams<T extends Record<string, any>>(params: T): string {
	function convertToString(value: any): string {
		if (value === null || value === undefined) {
			return '';
		}

		if (typeof value === 'string') {
			return value;
		}

		if (value instanceof Date) {
			return value.toISOString();
		}

		if (typeof value === 'object' && !Array.isArray(value)) {
			return JSON.stringify(value);
		}

		return String(value);
	}

	const queryParts: string[] = [];

	for (const key in params) {
		if (!Object.prototype.hasOwnProperty.call(params, key)) {
			continue;
		}

		const value = params[key];
		if (value === null || value === undefined) {
			continue;
		}

		// Manejar arrays con notación de corchetes
		if (Array.isArray(value)) {
			if (value.length === 0) {
				queryParts.push(`${encodeURIComponent(key)}[]=`);
			} else {
				for (const item of (value as any[])) {
					if (item !== null && item !== undefined) {
						queryParts.push(
							`${encodeURIComponent(key)}[]=${encodeURIComponent(convertToString(item))}`
						);
					}
				}
			}
		} else {
			queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(convertToString(value))}`);
		}
	}

	return queryParts.join('&');
}

export function groupObjectsBy<T, K extends string | number | symbol>(
	array: T[],
	key: (item: T) => K
): Record<K, T[]> {
	return array.reduce(
		(result, currentItem) => {
			const groupKey = key(currentItem);
			console.log('Key: ', groupKey);

			if (!result[groupKey]) {
				result[groupKey] = [];
			}

			result[groupKey].push(currentItem);

			return result;
		},
		{} as Record<K, T[]>
	);
}

export function formatDate(date: number | string) {
	return new Date(date).toLocaleDateString('es-CO', {
		month: 'short',
		day: 'numeric',
		year: 'numeric'
	});
}

export function formatCurrency(value: number | string) {
	const numberValue = typeof value === 'number' ? value : parseFloat(value);
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD'
	}).format(numberValue);
}

export function getRelativeTime(targetDate: Date): string {
	const now = new Date();
	const diffInSeconds = Math.floor((targetDate.getTime() - now.getTime()) / 1000);

	const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

	const timeIntervals = [
		{ unit: 'day', seconds: 86400 },
		{ unit: 'hour', seconds: 3600 },
		{ unit: 'minute', seconds: 60 },
		{ unit: 'second', seconds: 1 }
	];

	for (const { unit, seconds } of timeIntervals) {
		const interval = Math.floor(diffInSeconds / seconds);
		if (Math.abs(interval) >= 1) {
			return rtf.format(interval, unit as Intl.RelativeTimeFormatUnit);
		}
	}

	return rtf.format(0, 'second');
}