export interface AtividadeDataOutput {
	id: string
	nome: string
	pontos: number
	serie: string
	descricao: string
	prazofinal: string
	status: string | null
	escola: {
		id: string
		idLogin: string
		nome: string
		email: string
		nomeGestor: string
	}
	entregas: [AtividadeEntregaData]
}

export interface AtividadeEntregaData {
	id: string
	matricula: sintrg
}

export interface CriarAtividadeDataInput {
	nomeAtividade: string
	pontos: number
	serie: string
	descricao: string
	prazoFinal: string
}

export interface AtualizarAtividadeDataInput {
	idAtividade: string
	novoNome: string
	novaPontuacao: number
	novaSerie: string
	novaDescricao: string
	novoPrazo: string
}
