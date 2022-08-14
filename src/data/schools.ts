export interface School {
	id: number
	nome: string
	points: number
	gestor: string
	cpf: number
}

export const schools: School[] = [
	{
		id: 1,
		nome: 'Escola Fulano de Tal',
		cpf: 9876543210,
		gestor: 'Fulanão da Silva sauro',
		points: 13230,
	},
	{
		id: 2,
		nome: 'Escola das Flores',
		cpf: 1234567890,
		gestor: 'Fulana da Sivla Saura',
		points: 21230,
	},
	{
		id: 3,
		nome: 'Escola Patrício da Silva',
		cpf: 4214527170,
		gestor: 'Magaiver Junior',
		points: 7230,
	},
	{
		id: 4,
		nome: 'Escola Harvard',
		cpf: 1029381272,
		gestor: 'Albert Einstein',
		points: 40230,
	},
	{
		id: 5,
		nome: 'Escola Oxford',
		cpf: 9302751239,
		gestor: 'Isaac Newton',
		points: 30230,
	},
]
