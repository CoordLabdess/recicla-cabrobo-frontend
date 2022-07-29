export interface Material {
	id: number
	title: string
	category: MaterialCategory
	pointsPerKg: number
	icon: string
}

interface Plastic {
	type: 'plastic'
	color: '#D63636'
}

export type MaterialCategory = 'Plastic' | 'Paper' | 'Metal' | 'Glass'

export const materials: Material[] = [
	{
		id: 1,
		title: 'Garrafa PET',
		category: 'Plastic',
		pointsPerKg: 0.8,
		icon: '',
	},
	{
		id: 2,
		title: 'Plástico PEAD',
		category: 'Plastic',
		pointsPerKg: 0.6,
		icon: '',
	},
	{
		id: 3,
		title: 'Plásticos Diversos',
		category: 'Plastic',
		pointsPerKg: 0.5,
		icon: '',
	},
	{
		id: 4,
		title: 'Polipropileno',
		category: 'Plastic',
		pointsPerKg: 0.45,
		icon: '',
	},
	{
		id: 5,
		title: 'Papelão',
		category: 'Paper',
		pointsPerKg: 0.15,
		icon: '',
	},
	{
		id: 6,
		title: 'Sucata de Papel',
		category: 'Paper',
		pointsPerKg: 0.2,
		icon: '',
	},
	{
		id: 7,
		title: 'Sucata de Ferro',
		category: 'Metal',
		pointsPerKg: 0.8,
		icon: '',
	},
	{
		id: 8,
		title: 'Sucata de Cobre',
		category: 'Metal',
		pointsPerKg: 0.2,
		icon: '',
	},
	{
		id: 9,
		title: 'Latinha de Alumínio',
		category: 'Metal',
		pointsPerKg: 4.5,
		icon: '',
	},
	{
		id: 10,
		title: 'Sucata de Alumínio',
		category: 'Metal',
		pointsPerKg: 4.0,
		icon: '',
	},
	{
		id: 11,
		title: 'Aço Inox',
		category: 'Metal',
		pointsPerKg: 3.5,
		icon: '',
	},
]
