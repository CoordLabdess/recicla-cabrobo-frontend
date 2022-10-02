export type AwardCategorry = 'Eletrônico' | 'Brinquedo' | 'Outros' | ''

export interface Award {
	id: string
	nome: string
	especificacao: string
	preco: string
}
