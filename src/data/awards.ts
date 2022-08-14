export type AwardCategorry = 'Eletrônico' | 'Brinquedo' | 'Outros' | ''

export interface Award {
	id: number
	title: string
	description: string
	category: AwardCategorry
	price: number
}

export const awards: Award[] = [
	{
		id: 1,
		title: 'Bola de Futebol',
		category: 'Brinquedo',
		description: 'Bola maneira',
		price: 1000,
	},
	{
		id: 2,
		title: 'Hoverboard',
		category: 'Eletrônico',
		description: 'Skate chique de guarda do shopping',
		price: 20000,
	},
	{
		id: 3,
		title: 'Tablet',
		category: 'Eletrônico',
		description: 'Tablet bonito',
		price: 10000,
	},
]
