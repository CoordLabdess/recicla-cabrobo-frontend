import { Award, StudentData } from './student'
import axios from 'axios'

interface SchoolData {
	id: string
	idLogin: string
	nome: string
	email: string
	nomeGestor: string
}

export async function getSchoolDataFromToken(token: string): Promise<SchoolData> {
	return await axios
		.get('https://recicla-cabrobo-backend.herokuapp.com/escola/perfilEscola', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then(res => {
			const x = res.data as SchoolData
			return x
		})
		.catch(err => {
			throw new Error(err)
		})
}

export interface SchoolRank {
	nome: string
	pontos: number
}

export async function getSchoolRank(token: string): Promise<SchoolRank[]> {
	return await axios
		.get('https://recicla-cabrobo-backend.herokuapp.com/escola/listarRankingEscolas', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then(res => {
			const x = res.data as SchoolRank[]
			return x
		})
		.catch(err => {
			throw new Error(err)
		})
}

export async function getSchoolPointsById(id: string, token: string): Promise<number> {
	return await axios
		.get('https://recicla-cabrobo-backend.herokuapp.com/escola/pontosEscola', {
			params: {
				idEscola: id,
			},
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then(res => {
			const x = res.data as number
			return x
		})
		.catch(err => {
			throw new Error(err)
		})
}

export interface SchoolAwardsWithdraw {
	id: string
	status: number
	created_at: string
	aluno: {
		id: string
		matricula: string
		nome: string
		sexo: string
		idade: number
		serie: number
		pontos: number
	}
	premio: {
		id: string
		nome: string
		preco: number
	}
}

export async function getSchoolAwardsWithdrawHistory(
	token: string,
): Promise<SchoolAwardsWithdraw[]> {
	return await axios
		.get('https://recicla-cabrobo-backend.herokuapp.com/resgatePremio/listar', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then(res => {
			const x = res.data as SchoolAwardsWithdraw[]
			return x
		})
		.catch(err => {
			throw new Error(err)
		})
}

export async function getStudentByMatricula(
	matricula: string,
	token: string,
): Promise<StudentData> {
	return await axios
		.get(
			`https://recicla-cabrobo-backend.herokuapp.com/escola/consultarAlunoMatricula/${matricula}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		)
		.then(res => {
			const x = res.data as StudentData
			return x
		})
		.catch(err => {
			throw new Error(err)
		})
}

export interface Entrega {
	id: string
	escola: string
	idMaterial: string
	pesagemEntrega: string
	pontosEntrega: string
	created_at: string
	aluno: StudentData
}

export async function getSchoolDeliveryHistory(token: string): Promise<Entrega[]> {
	return await axios
		.get('https://recicla-cabrobo-backend.herokuapp.com/escola/consultarEntregasCompletas', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then(res => {
			const x = res.data as Entrega[]
			return x
		})
		.catch(err => {
			throw new Error(err)
		})
}

export async function getStudentsList(token: string): Promise<StudentData[]> {
	return await axios
		.get('https://recicla-cabrobo-backend.herokuapp.com/escola/listarAlunos', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then(res => {
			const x = res.data as StudentData[]
			return x
		})
		.catch(err => {
			throw new Error(err)
		})
}

interface CadastroAlunoForm {
	nome: string
	serie: string
	matricula: string
	sexo: string
	idade: number
}

export async function registerStudent(
	token: string,
	aluno: CadastroAlunoForm,
): Promise<StudentData[]> {
	return await axios
		.post(
			'https://recicla-cabrobo-backend.herokuapp.com/escola/cadastrarAluno',
			{
				nome: aluno.nome,
				serie: aluno.serie,
				matricula: aluno.matricula,
				sexo: aluno.sexo,
				idade: aluno.idade,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		)
		.then(res => {
			const x = res.data as any
			return x
		})
		.catch(err => {
			throw new Error(err)
		})
}

export interface DadosEntrega {
	idMaterial: string
	pesagemEntrega: number
}

export async function criarEntrega(
	token: string,
	matricula: string,
	dadosEntrega: DadosEntrega[],
): Promise<{ pontosRecebidos: number; statusPontuacaoAluno: string }> {
	return await axios
		.post(
			'https://recicla-cabrobo-backend.herokuapp.com/escola/criarEntrega',
			{
				matriculaAluno: matricula,
				dadosEntrega: dadosEntrega,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		)
		.then(res => {
			const x = res.data as any
			return x
		})
		.catch(err => {
			throw new Error(err)
		})
}

interface AlterarAlunoData {
	matriculaAluno: string
	novaIdade: number
	novoNome: string
	novaSerie: string
	novoSexo: string
}

export async function editarAluno(token: string, data: AlterarAlunoData) {
	await axios
		.patch(
			'https://recicla-cabrobo-backend.herokuapp.com/escola/alterarAlunos',
			{
				matriculaAluno: data.matriculaAluno,
				novaIdade: data.novaIdade,
				novaSerie: data.novaSerie,
				novoNome: data.novoNome,
				novoSexo: data.novoSexo,
			} as AlterarAlunoData,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		)
		.then(res => {
			return
		})
		.catch(err => {
			throw new Error(err)
		})
}

export interface CriarAtividadeData {
	id?: string
	nomeAtividade: string
	pontos: number
	serie: string
}

export async function criarAtividade(token: string, data: CriarAtividadeData) {
	await axios
		.post(
			'https://recicla-cabrobo-backend.herokuapp.com/escola/criarAtividade',
			{
				nomeAtividade: data.nomeAtividade,
				pontos: data.pontos,
				serie: data.serie,
			} as CriarAtividadeData,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		)
		.then(res => {
			return
		})
		.catch(err => {
			throw new Error(err)
		})
}

export interface AtividadeData {
	id: string
	nome: string
	pontos: number
	serie: string
	escola: SchoolData
	status: string | null
	entregas: { id: string; matricuka: string }[]
}

export async function listarAtividades(token: string): Promise<AtividadeData[]> {
	return await axios
		.get('https://recicla-cabrobo-backend.herokuapp.com/escola/listarAtividades', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then(res => {
			const x = res.data as AtividadeData[]
			return x
		})
		.catch(err => {
			throw new Error('aaa')
		})
}

export interface AtualizarAtividadeInput {
	idAtividade: string
	newSerie: string
	newPoints: number
}

export async function atualizarAtividade(token: string, data: AtualizarAtividadeInput) {
	await axios
		.patch(
			'https://recicla-cabrobo-backend.herokuapp.com/escola/alterarAtividade',
			{
				idAtividade: data.idAtividade,
				newPoints: data.newPoints,
				newSerie: data.newSerie,
			} as AtualizarAtividadeInput,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		)
		.then(res => {
			console.log('aa')
			return
		})
		.catch(err => {
			throw new Error(err)
		})
}

export async function excluirAtividade(token: string, atividadeId: string) {
	await axios
		.delete('https://recicla-cabrobo-backend.herokuapp.com/escola/atividade', {
			headers: {
				Authorization: 'Bearer ' + token,
			},
			data: {
				idAtividade: atividadeId,
			},
		})
		.then(res => {
			return
		})
		.catch(err => {
			throw new Error(err)
		})
}

export async function listarPremios(token: string): Promise<Award[]> {
	return await axios
		.get('https://recicla-cabrobo-backend.herokuapp.com/premio/listar', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then(res => {
			const x = res.data as Award[]
			return x
		})
		.catch(err => {
			throw new Error(err)
		})
}

export async function resgatarPremio(token: string, matriculaAluno: string, premio: string) {
	await axios
		.post(
			'https://recicla-cabrobo-backend.herokuapp.com/escola/criarResgatePremios',
			{
				matriculaAluno: matriculaAluno,
				premio: premio,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		)
		.then(res => {
			console.log(res.data)
			return
		})
		.catch(err => {
			console.log(err)
			throw new Error(err)
		})
}

export async function atualizarEstoque(token: string, premioId: string, quantidade: number) {
	await axios
		.patch(
			`https://recicla-cabrobo-backend.herokuapp.com/escola/addEstoque/${premioId}`,
			{
				quantidadeAdicionada: quantidade,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		)
		.then(res => {
			return
		})
		.catch(err => {
			throw new Error(err)
		})
}

export async function deletarAluno(token: string, studentId: string) {
	await axios
		.patch(
			`https://recicla-cabrobo-backend.herokuapp.com/escola/deletarAluno/${studentId}`,
			{},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		)
		.then(res => {
			return
		})
		.catch(err => {
			console.log(err)
			throw new Error(err)
		})
}

export async function deletarAtividade(token: string, atividadeId: string) {
	await axios
		.patch(
			`https://recicla-cabrobo-backend.herokuapp.com/escola/deletarAtividade`,
			{
				idAtividade: atividadeId,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		)
		.then(res => {
			return
		})
		.catch(err => {
			console.log(err)
			throw new Error(err)
		})
}
