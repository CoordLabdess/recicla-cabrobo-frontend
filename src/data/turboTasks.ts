export interface TurboTask {
	id: number
	title: string
	class: string
	active: boolean
	description: string
	deadline: Date
	points: number
}

export const turboTasks: TurboTask[] = [
	{
		id: 1,
		title: 'Maquete do Sistema Solar',
		class: '8º ano',
		active: true,
		description:
			'Os alunos devem se reunir em equipes de 4 e montar uma maquete do nosso sistema solar.',
		deadline: new Date(),
		points: 120,
	},
	{
		id: 2,
		title: 'Medidor de PH',
		class: '9º ano',
		active: true,
		description:
			'Os alunos devem se reunir em equipes de 3 e criar um medidor de PH utilizando repolho roxo, seguindo as orientações do(a) professor(a)',
		deadline: new Date(),
		points: 140,
	},
	{
		id: 3,
		title: 'Redação Temática',
		class: '7º ano',
		active: true,
		description:
			'Cada aluno deverá escrever uma redação, com no mínimo 30 linhas, sobre o tema: Os Desafios da Reciclagem no Brasil.',
		deadline: new Date(),
		points: 100,
	},
	{
		id: 4,
		title: 'Ponte de Lego',
		class: '6º ano',
		active: true,
		description:
			'Os alunos deverão se dividir em equipes de 4 e construir pontes utilizandos peças de lego.',
		deadline: new Date(),
		points: 115,
	},
]
