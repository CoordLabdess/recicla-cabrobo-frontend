export type AwardCategorry = 'Eletrônico' | 'Brinquedo' | 'Outros' | ''

export interface Award {
	id: string
	nome: string
	preco: string
}

export const awards: Award[] = [
	{
		id: '1',
		nome: 'Bola de Futebol',
		preco: '1000',
	},
	{
		id: '2',
		nome: 'Hoverboard',
		preco: '20000',
	},
	{
		id: '3',
		nome: 'Tablet',
		preco: '10000',
	},
]
