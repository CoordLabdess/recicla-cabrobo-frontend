import { StudentData } from './student'
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
