import type { Establecimiento } from '$types/establecimiento';
import type { Evento } from '$lib/types/evento';

export class DatabaseController {
	async getEstablecimiento(id: string | number): Promise<Establecimiento> {
		return {
			id: id,
			nombre: 'Nightclub Bolivar',
			score: 4.5,
			tags: ['Crossover', 'Destacado', 'Popular'],
			description:
				'Nightclub Bolívar es un reconocido lugar de entretenimiento nocturno en Bogotá, Colombia, famoso por su estilo sofisticado y una vibrante atmósfera que combina lo moderno con toques retro. Situado en una casona histórica restaurada, el club tiene un diseño arquitectónico que mezcla lo clásico y lo contemporáneo, brindando un espacio único para la vida nocturna.',
			imagenes: [
				'https://s3-alpha-sig.figma.com/img/0c7b/1e4c/f7822a7c1e87b180e5918e03cc04a2cd?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=uGMwKmT7VLFnc3j9g4-9AS0EwVOPko5BIgLwhZ5THGXIrUsjcQe-YLvE1hv0~kG0CLLw-XA6WuDTZvy7wSkcp8Sh~nr8bq1YRwL8qjXadX8EzigsRVFP6c5sQNq65Y69NFDveGAW9iz0qG0YjhzY5bjpCPckyQd9cWm38Jug0GJsJ7Vo0y0gGsCGmPMod6Ysy030a2EjamSqQyG5d1VoJxmkfHQN-8O8vll9sTJtsRUma9nWebL2b5ofngFYbvwaRk1k2FstcCIKMAkKGE13kyNs-1gtxY6tikmBepZVUP~SnL~UZLwQpW-3f~Xs9scq3Hp6bhhLHY0zNmq5MqWNTQ__',
				'https://s3-alpha-sig.figma.com/img/3e0b/2fa7/24d404e4b4c5f31a9279cb83abf862eb?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=XKNOG7~ylt9KQWO0DeqneOYmcW9MK4Jj0oUSC-PpWEfFviW~Lk139sMturo4ceg4Jr9NZiXe22L803IL348dw~XsApgRoN3~TBYry7hLV~lZP0v7SKOFtIIeOV5qUrmAmLwhysLOpziS9bZB5clyruMQqrL7JWeHVpmg2P09hve2LR9-Jxk9gc7Y3Ief9iV4051RLHCJslbnDffm4O3hRpK6MyUc~w~qxjDL4KyiEaZTZdch5ylJssagyrX5LQWzX-V0Z4J8v14x0OzQfW-R3HydeSNiLw7n-4dOBcEClGzzLJYtjFFRA8SczKD1MqtRce9nkmzkraSEPAdKuK0EFg__',
				'https://s3-alpha-sig.figma.com/img/cf1f/deb2/14ee29e9f06d59da0cb59c5edb13f88a?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=b8qR6K8iwThmPosbjMfmfoVtxSwcl5oqFE1O75iMFSRAeWhE2BNEXWXwYuryEHwlEv~7AjoNeZK7B8114EIP0Ol6x8mOVFs67AuzjzI363xhTv7yCe0sH6Z18QafVE0tliriNRm5xGEuYm7iZEZID7fjTsqoPXZ7DB30loonolaZMPZbffDtQ9bJbFV0Y0quxMqlnT~sL325oXgsn-bL-ZdsWaEJ5dSNWkQcFm8Jk~3NnmgXWvqeeU8Z9Yx0h5PAWhGV0xLr3-UAMjASkJTX0HkS922YJhQFh79dsrgwwM2565~R4clqIL265UH7zq5QqRDEdktQJZ1-OhwGgaKJKw__',
				'https://s3-alpha-sig.figma.com/img/6060/c0aa/29c740bdf6145d9c99dd9a5b71cb22f5?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=AsiZ6obXQ7cWzCklurmGWeYa1GI~V6kgtc-UxVS5WpwzyJ-XL~fAi8cI4F3AB5c0rKpcgIjjX4kngl~huVL0Z9yzTi21-GBQAyNLEWyF4NEs~9jdXAGoOGlcbqbb7lOoEU6N4T73RqtAwS3qhfj8WHRRU11snJiU72PY2bZvNBSlB~qKnWjJ2qccTT0dueu5cUZ98PTs9cLsyEU-FGyQcGhQ~TsGCd-4ix90kWR7Lw7aT-GVko5B7THJn9GkijZPH24bus1VgOAwSg7CtoRAybSR49Ba2GZBa46Zul4WqxOTTYwmVG2kC47YqxZN3GAv216sLPcLZSFNOKM3PR6Tww__',
				'https://s3-alpha-sig.figma.com/img/8a54/444f/385c96c9c663822b80c1c4e71aa382b1?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=FWPaiR4tKW2ud~UkuBDlgS8Ej2Va2xz4GzRwuEVRut2~S~QQXr5Qf2VyetR48pEZQVLNVO9TT5nN9PSdq9lwCK0prWO~9dbPa6dM8yIVYDDDk5O8QAzLqWe5cHZfO2r3Gw1WKye~0QmrADuO9aOnLS4gD1QGVk2-pWbN~iBrS2rs-K-94TxssPszNQZJvDUST3LgbbP1GB9uQphy9-kIp8iSbVfCtg~MQ9CKbsGNJWBnJbDCQ8zp2ytCTFPc1SoXKEsisTijB2sg7E3VWX5wOx~SGE2ew6uC56ubo6~lR3dCVIyB03Jqc02PIqcreuTzqFSDKDnEUjxLkLWo0QpHiA__'
			],
			imagen:
				'https://s3-alpha-sig.figma.com/img/5506/2cec/1ea5cd55e1aa10886a1ba728c248ba99?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=qqd0gnkU4kRiGHqwzJAg7Y9EN~WlH1MYEfTMPkdQIICp11BhLheP-FEkJvVRWSBkQeXuzSzuLTCS-SoEm-1a~UZi46eJ3~yfnHCofZLoAvro5KkzKL6SR3iu4vxqprNTRlBFClDB95B0gSeo2Xu7M~NXHRMXO75vTC2jOpxeLBF0pn~ui2LYLwV-jOJsXURow-19STIjCoB-U47NyobiI1nGjwHIrBbI19~OA1HD~ksKL9qB8W4YaYIlRnGTSMCEcVqqqpeumOTw19xXhyWR7mr-Omu84lm9673g~e-IoXVRTyi2vo0zEip3gEJC~qtRP~7QR8yhUvOW6OBjNDUkpw__',
			ubicacion: {
				lat: 6.2095012,
				lng: -75.5688671
			}
		};
	}

	async getEstablecimientos(): Promise<Establecimiento[]> {
		return [
			{
				nombre: 'Nightclub Bolivar',
				score: 4.5,
				tags: ['Crossover', 'Destacado', 'Popular'],
				description:
					'Nightclub Bolívar es un reconocido lugar de entretenimiento nocturno en Bogotá, Colombia, famoso por su estilo sofisticado y una vibrante atmósfera que combina lo moderno con toques retro. Situado en una casona histórica restaurada, el club tiene un diseño arquitectónico que mezcla lo clásico y lo contemporáneo, brindando un espacio único para la vida nocturna.',
				imagenes: [
					'https://s3-alpha-sig.figma.com/img/0c7b/1e4c/f7822a7c1e87b180e5918e03cc04a2cd?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=uGMwKmT7VLFnc3j9g4-9AS0EwVOPko5BIgLwhZ5THGXIrUsjcQe-YLvE1hv0~kG0CLLw-XA6WuDTZvy7wSkcp8Sh~nr8bq1YRwL8qjXadX8EzigsRVFP6c5sQNq65Y69NFDveGAW9iz0qG0YjhzY5bjpCPckyQd9cWm38Jug0GJsJ7Vo0y0gGsCGmPMod6Ysy030a2EjamSqQyG5d1VoJxmkfHQN-8O8vll9sTJtsRUma9nWebL2b5ofngFYbvwaRk1k2FstcCIKMAkKGE13kyNs-1gtxY6tikmBepZVUP~SnL~UZLwQpW-3f~Xs9scq3Hp6bhhLHY0zNmq5MqWNTQ__',
					'https://s3-alpha-sig.figma.com/img/3e0b/2fa7/24d404e4b4c5f31a9279cb83abf862eb?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=XKNOG7~ylt9KQWO0DeqneOYmcW9MK4Jj0oUSC-PpWEfFviW~Lk139sMturo4ceg4Jr9NZiXe22L803IL348dw~XsApgRoN3~TBYry7hLV~lZP0v7SKOFtIIeOV5qUrmAmLwhysLOpziS9bZB5clyruMQqrL7JWeHVpmg2P09hve2LR9-Jxk9gc7Y3Ief9iV4051RLHCJslbnDffm4O3hRpK6MyUc~w~qxjDL4KyiEaZTZdch5ylJssagyrX5LQWzX-V0Z4J8v14x0OzQfW-R3HydeSNiLw7n-4dOBcEClGzzLJYtjFFRA8SczKD1MqtRce9nkmzkraSEPAdKuK0EFg__',
					'https://s3-alpha-sig.figma.com/img/cf1f/deb2/14ee29e9f06d59da0cb59c5edb13f88a?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=b8qR6K8iwThmPosbjMfmfoVtxSwcl5oqFE1O75iMFSRAeWhE2BNEXWXwYuryEHwlEv~7AjoNeZK7B8114EIP0Ol6x8mOVFs67AuzjzI363xhTv7yCe0sH6Z18QafVE0tliriNRm5xGEuYm7iZEZID7fjTsqoPXZ7DB30loonolaZMPZbffDtQ9bJbFV0Y0quxMqlnT~sL325oXgsn-bL-ZdsWaEJ5dSNWkQcFm8Jk~3NnmgXWvqeeU8Z9Yx0h5PAWhGV0xLr3-UAMjASkJTX0HkS922YJhQFh79dsrgwwM2565~R4clqIL265UH7zq5QqRDEdktQJZ1-OhwGgaKJKw__',
					'https://s3-alpha-sig.figma.com/img/6060/c0aa/29c740bdf6145d9c99dd9a5b71cb22f5?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=AsiZ6obXQ7cWzCklurmGWeYa1GI~V6kgtc-UxVS5WpwzyJ-XL~fAi8cI4F3AB5c0rKpcgIjjX4kngl~huVL0Z9yzTi21-GBQAyNLEWyF4NEs~9jdXAGoOGlcbqbb7lOoEU6N4T73RqtAwS3qhfj8WHRRU11snJiU72PY2bZvNBSlB~qKnWjJ2qccTT0dueu5cUZ98PTs9cLsyEU-FGyQcGhQ~TsGCd-4ix90kWR7Lw7aT-GVko5B7THJn9GkijZPH24bus1VgOAwSg7CtoRAybSR49Ba2GZBa46Zul4WqxOTTYwmVG2kC47YqxZN3GAv216sLPcLZSFNOKM3PR6Tww__',
					'https://s3-alpha-sig.figma.com/img/8a54/444f/385c96c9c663822b80c1c4e71aa382b1?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=FWPaiR4tKW2ud~UkuBDlgS8Ej2Va2xz4GzRwuEVRut2~S~QQXr5Qf2VyetR48pEZQVLNVO9TT5nN9PSdq9lwCK0prWO~9dbPa6dM8yIVYDDDk5O8QAzLqWe5cHZfO2r3Gw1WKye~0QmrADuO9aOnLS4gD1QGVk2-pWbN~iBrS2rs-K-94TxssPszNQZJvDUST3LgbbP1GB9uQphy9-kIp8iSbVfCtg~MQ9CKbsGNJWBnJbDCQ8zp2ytCTFPc1SoXKEsisTijB2sg7E3VWX5wOx~SGE2ew6uC56ubo6~lR3dCVIyB03Jqc02PIqcreuTzqFSDKDnEUjxLkLWo0QpHiA__'
				],
				imagen:
					'https://s3-alpha-sig.figma.com/img/5506/2cec/1ea5cd55e1aa10886a1ba728c248ba99?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=qqd0gnkU4kRiGHqwzJAg7Y9EN~WlH1MYEfTMPkdQIICp11BhLheP-FEkJvVRWSBkQeXuzSzuLTCS-SoEm-1a~UZi46eJ3~yfnHCofZLoAvro5KkzKL6SR3iu4vxqprNTRlBFClDB95B0gSeo2Xu7M~NXHRMXO75vTC2jOpxeLBF0pn~ui2LYLwV-jOJsXURow-19STIjCoB-U47NyobiI1nGjwHIrBbI19~OA1HD~ksKL9qB8W4YaYIlRnGTSMCEcVqqqpeumOTw19xXhyWR7mr-Omu84lm9673g~e-IoXVRTyi2vo0zEip3gEJC~qtRP~7QR8yhUvOW6OBjNDUkpw__',
				ubicacion: {
					lat: 6.2095012,
					lng: -75.5688671
				}
			},
			{
				nombre: 'Bar La Playa',
				score: 4.2,
				tags: ['Reggaeton', 'Popular', 'Beach'],
				description:
					'Bar La Playa es un vibrante bar temático de playa en Cartagena, Colombia, conocido por su ambiente relajado y su música reggaeton. Con una decoración inspirada en la playa y cócteles tropicales, es el lugar perfecto para disfrutar de una noche divertida.',
				imagenes: [
					'https://s3-alpha-sig.figma.com/img/1a2b/3c4d/5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=example1',
					'https://s3-alpha-sig.figma.com/img/2b3c/4d5e/6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=example2'
				],
				imagen:
					'https://s3-alpha-sig.figma.com/img/2406/ce01/79c8105d577bb8a1092730caca741f4d?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=SgvCqW4G4IWG506Z1TZV0rd6v2NtcsIu~bnZ7VG67OBvnf9QiVgpCt99R1tGXnHBz9fRKlfPsrwr1LgodEKPInZVdCvUFToLQWE1j9kyOtiq-saJuKSFRZreiWMBvaccr4z2zb9nTH4lE~lH6ycI6P1HjiBdPWIlRFFuCuqLmM8eriDhuRp0qvacE5idxYVg5Yu9qJ0A32t4DTmtlyINP3TNPuk17RHLB3dzCSU695g~ZgjvEITuJ29k0e6j0DtDMcHcYibn9sDgL7lXVaRizyuWrzIcqG7U7ZBTqA90gPZ0h~C5x4axANJO3QuIL5-q6cDL5zXCRZninpHmu6eBRw__',
				ubicacion: {
					lat: 10.391048,
					lng: -75.479426
				}
			},
			{
				nombre: 'Café del Mar',
				score: 4.8,
				tags: ['Chill', 'Sunset', 'Scenic'],
				description:
					'Café del Mar es un icónico café en Cartagena, Colombia, famoso por sus impresionantes vistas al atardecer y su ambiente relajado. Es el lugar ideal para disfrutar de una bebida mientras se contempla la puesta de sol sobre el mar Caribe.',
				imagenes: [
					'https://s3-alpha-sig.figma.com/img/4d5e/6f7g/8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=example4',
					'https://s3-alpha-sig.figma.com/img/5e6f/7g8h/9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=example5'
				],
				imagen:
					'https://s3-alpha-sig.figma.com/img/6182/04bd/d47e7079bfa3f66ab05e2daceea3a518?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=MsTdn7NY74b~n0xDuSkbFHeEMvr03B0aJgfXV9QErVQU3xotDcgVzj8Ebe8KCpUUKgHVtjHG1KNnaOn1WSwj3pRlwbSfpLeOAI1LBs~wVw43p4cj6L5QwcPQxq7Bm6iC-RehJt-zEAFC5JLAKoY0GwS9ZmuwNi6bnXWnTHtVYsX00BM3unez8-hQ7g~esy1yNGS3pTscMUEkLDlXO174HUtB-a08nK1mcN9B7Vr5xf0FoqK52VChk0i1MrvqDRtODLQF9ij3k9EviY~pbtgh0pJY2iPqwaK8-i~djK~YYx6j3HRJZ55Lm6gsjzukpE7ZFLn4hBjkcimtpXhinDNqWA__',
				ubicacion: {
					lat: 10.423446,
					lng: -75.551272
				}
			}
		];
	}
	async getEventos(): Promise<Evento[]> {
		return [
			{
				nombre: 'BOOK FAIR',
				fecha: 'Martes 28 de septiembre',
				imagen:
					'https://s3-alpha-sig.figma.com/img/bbb3/befc/bd3812f6dfd19214d49a0ab8935ffd5f?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=h-DqnS4KbDtrWBInPRD8B2dvvQkJAwYx4v5sqXFqwnvS9kVv2JREOlVMA1lo7uPg3Nvgp3KXnp-IoqXXVD6ysAt3qNbeO1DYVl5wxTDbUeCPZKyLYAfSPTkyxTa4v22LrFUita5hHiOVbcpXyrvdCq8lAcykdTCN44PKtNJFgiZ5LAXH88WzjR8ahxY~X2sJZZDP6OdK7Q222cMYvCQTYGYyQklPYYs8DMRjVyI0TqygG1alLf7YnzmHq2zZHScr3lS4JA~QC8F2N6JU4bcLtmHo2jOtjmzwUIfj66wDr-0EoalaMqAoEhuUiTYu5Zw7Tb2JT9Zh5TFiHO8FGBY1Jg__',
				lugar: 'Biblioteca Nacional',
				hora: {
					inicio: '9:00 AM',
					fin: '6:00 PM'
				}
			},
			{
				nombre: 'MUSIC FESTIVAL 1',
				fecha: 'Sábado 25 de septiembre',
				lugar: 'Dulcinea',
				imagen:
					'https://s3-alpha-sig.figma.com/img/d7bf/6462/181c0ca9c18ca4373c7cb037ac946b3d?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=dRgEUSj-dGt6MBUwd6DDLc2~BpMzSjf~PEqsqMni3EKgFrzAf4PkGqP9Dq7U1tpQhoW6eRS7diJz78wpdlzaIIW1RXTAQQJeOHAWTunzNikApme0FD0mirBsjDu3sVivJehzeqrbRNBa5hSbcBOCUIsvUviCTnU2GreAm1rFwXTRhzX6ApBwJriPgm6ceIoxiY4PI6L0FzwAPUHsIZoYJCfJHyV3S3GsypJmHW5e~9ECbv2GOugdD7zURWDMICyXPxtxS6l2lBmcjCVwj-GwGi25QOuCYgBuedyeALtWnJ7s5cUSGp-RJcVPJKSSjQLzuXQcl0E2nB6-zuxUBjnFSw__',
				hora: {
					inicio: '8:00 PM',
					fin: '3:00 AM'
				}
			},
			{
				nombre: 'ART EXHIBITION',
				fecha: 'Domingo 26 de septiembre',
				imagen:
					'https://s3-alpha-sig.figma.com/img/af1d/ca5d/69e20b30e73bf58940ceec4a8a01715e?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=fNvcHAv1Xj93bAhsu22Z9wkCWwM012VaFUnX2gJzNUvdyJJdfebvSOSr7CAwtumAQ2GHZQgsjQx3rw9bmabP9XA-m3Uu5F2AOhAwcRCXZMoZymhKq8-b27MSgn1OTSDCsb-gW8j8ab01DB~fTe1qD0g7e5908hF1TRIcybID5LmRoLaVbAtgcYnuF-QsDNTHZgMJbsK1TvzkifGkLK0heTdz9452JeGPa3XF97jQQgET86ksARAaph0bwbL79uW~zIFZVn2SfnTa53F4g8QZF3o1RG0Gg2olYgueKKb0e88~npBduEI1x8SKaY1A81YzKadmj5qEXyfbLwFIEVaTWw__',
				lugar: 'Galería Central',
				hora: {
					inicio: '10:00 AM',
					fin: '5:00 PM'
				}
			},
			{
				nombre: 'FOOD FESTIVAL',
				fecha: 'Lunes 27 de septiembre',
				imagen:
					'https://s3-alpha-sig.figma.com/img/b57e/0e7b/0233bf1ef5280d8d193a30950d3b1ea4?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=DvdZg4ngEiWpBpaM3dlrVFn5rWFqqQUNi2dhzIzaZHIMKea3Kg8ygjdSygXmtx2alqnrwqnJGHcN7rHLvQzSS-WgG3W~rxDmZFD6alLWJAgc4gz94hFe4G1DYV2tEkRdDfDlGycOxlJnvEQ6nNdRVmo-33B4d6oFVFGLdMEQ~TzVBKMSPwP5sWq0pSRNKuOG8ZYUc2eLUsRRSWWWH6JOZhRZwx5a1oTdSRE1wmG2m3CsiR4YZk1xvrniGHa9X2aCpm2doCWPTqaIWX~VPeABW8ZrMKP~V83nMIYTmqW6a~V7cGApsK6e2XYa0AXXHGDK9VF-tfIcCsodIk824bwwsQ__',
				lugar: 'Parque Central',
				hora: {
					inicio: '12:00 PM',
					fin: '8:00 PM'
				}
			},
			{
				nombre: 'TECH CONFERENCE',
				fecha: 'Miércoles 29 de septiembre',
				imagen:
					'https://s3-alpha-sig.figma.com/img/bbb3/befc/bd3812f6dfd19214d49a0ab8935ffd5f?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=h-DqnS4KbDtrWBInPRD8B2dvvQkJAwYx4v5sqXFqwnvS9kVv2JREOlVMA1lo7uPg3Nvgp3KXnp-IoqXXVD6ysAt3qNbeO1DYVl5wxTDbUeCPZKyLYAfSPTkyxTa4v22LrFUita5hHiOVbcpXyrvdCq8lAcykdTCN44PKtNJFgiZ5LAXH88WzjR8ahxY~X2sJZZDP6OdK7Q222cMYvCQTYGYyQklPYYs8DMRjVyI0TqygG1alLf7YnzmHq2zZHScr3lS4JA~QC8F2N6JU4bcLtmHo2jOtjmzwUIfj66wDr-0EoalaMqAoEhuUiTYu5Zw7Tb2JT9Zh5TFiHO8FGBY1Jg__',
				lugar: 'Centro de Convenciones',
				hora: {
					inicio: '9:00 AM',
					fin: '5:00 PM'
				}
			}
		];
	}
}
