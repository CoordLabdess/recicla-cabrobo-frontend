export interface Material {
	id: string
	title: string
	category: MaterialCategory
	pointsPerKg: number
	icon: string
}

interface Plastico {
	type: 'plastico'
	color: '#D63636'
}

export type MaterialCategory = 'Plastico' | 'Papel' | 'Metal' | 'Vidro'

export const materials: Material[] = [
	{
		id: '27552729-bedf-42ec-9254-6a3c4a6730df',
		title: 'Garrafa PET',
		category: 'Plastico',
		pointsPerKg: 1.5,
		icon: '',
	},
	{
		id: 'da5258a4-138d-4e4c-b32a-8ff02f049878',
		title: 'Plástico Diversos',
		category: 'Plastico',
		pointsPerKg: 1,
		icon: '',
	},
	{
		id: 'f0d6a223-11a6-4d75-836d-2f596e61f63b',
		title: 'PEAD',
		category: 'Plastico',
		pointsPerKg: 1.3,
		icon: '',
	},
	{
		id: '07ea2ebe-d40a-45a2-ae5d-cb6b172e4203',
		title: 'Metal',
		category: 'Metal',
		pointsPerKg: 15,
		icon: '',
	},
	{
		id: '56968a7b-fb08-48f0-8010-607324d05685',
		title: 'Sucata de ferro',
		category: 'Metal',
		pointsPerKg: 0.8,
		icon: '',
	},
	{
		id: '6e9d4de0-ef49-4b40-8a00-768f5abd8323',
		title: 'Alumínio',
		category: 'Metal',
		pointsPerKg: 7.0,
		icon: '',
	},
	{
		id: '8b311f78-4400-4f76-909a-259681f1dae0',
		title: 'Sucata de latinha',
		category: 'Metal',
		pointsPerKg: 5.5,
		icon: '',
	},
	{
		id: 'b346c87d-fcf4-48d8-a7cc-22a0a701f61c',
		title: 'Sucata de Cobre',
		category: 'Metal',
		pointsPerKg: 0.2,
		icon: '',
	},
	{
		id: '4b2dd6c4-072b-4274-824b-1ceb43fdc813',
		title: 'Papelão',
		category: 'Papel',
		pointsPerKg: 0.15,
		icon: '',
	},
	{
		id: '74c16d5b-45c7-467b-8e5b-7e59def0e151',
		title: 'Jornais e revistas',
		category: 'Papel',
		pointsPerKg: 0.2,
		icon: '',
	},
]
