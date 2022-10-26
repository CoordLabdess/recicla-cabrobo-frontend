import axios from 'axios'
import { AtividadeDataOutput } from '../types/atividades.type'
import { CLIENT_URL } from './client'

export interface StudentData {
	id: string
	matricula: number
	nome: string
	sexo: string
	idade: number
	serie: string
	pontos: number
	imagemPerfil: null
	status: string | null
	escola: {
		id: string
		idLogin: number
		nome: string
		email: string
		nomeGestor: string
	}
}

export async function getStudentData(token: string): Promise<StudentData> {
	return await axios
		.get(`${CLIENT_URL}/aluno`, {
			headers: { Authorization: `Bearer ${token}` },
		})
		.then(res => {
			return res.data
		})
		.catch(error => {
			throw new Error(error)
		})
}

export interface StudentRank {
	nome: string
	matricula: string
	pontos: number
}

export async function getRanking(token: string, studentCode: string): Promise<number> {
	return await axios
		.get(`${CLIENT_URL}/aluno/rankingAlunos`, {
			headers: { Authorization: `Bearer ${token}` },
		})
		.then(res => {
			const rank = res.data as StudentRank[]
			const pos =
				rank
					.sort((a: StudentRank, b: StudentRank) => b.pontos - a.pontos)
					.indexOf(rank.filter(x => x.matricula === String(studentCode))[0]) + 1

			return pos
		})
		.catch(error => -1)
}

export async function getGeneralRank(token: string): Promise<StudentRank[]> {
	return await axios
		.get(`${CLIENT_URL}/aluno/rankingAlunos`, {
			headers: { Authorization: `Bearer ${token}` },
		})
		.then(res => {
			const rank = res.data as StudentRank[]
			return rank.sort((a, b) => b.pontos - a.pontos)
		})
}

export interface History {
	id: string
	escola: string
	idMaterial: string
	nomeMaterial: string
	pesagemEntrega: string
	pontosEntrega: string
	dataEntrega: string
}

export async function getStudentHistory(token: string): Promise<History[]> {
	return await axios
		.get(`${CLIENT_URL}/aluno/listarEntregas`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then(res => {
			const h = res.data as History[]
			return h
		})
		.catch(() => {
			return []
		})
}

export interface AwardHistory {
	id: string
	status: number
	premio: Award
	created_at?: string
}

export interface Award {
	id: string
	nome: string
	especificacao: string
	estoque: number
	preco: string
}

export async function getStudentAwardHistory(token: string): Promise<AwardHistory[]> {
	return await axios
		.get(`${CLIENT_URL}/aluno/listResgates`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then(res => {
			const x = res.data as AwardHistory[]
			return x
		})
		.catch(error => {
			return []
		})
}

export async function getAwardList(token: string): Promise<Award[]> {
	return await axios
		.get(`${CLIENT_URL}/premio/listar`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then(res => {
			const x = res.data as Award[]
			return x
		})
		.catch(error => {
			return []
		})
}

export async function listarAtividadesDoAluno(token: string): Promise<AtividadeDataOutput[]> {
	return await axios
		.get(`${CLIENT_URL}/aluno/listarAtividades`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then(res => {
			const x = res.data as AtividadeDataOutput[]
			return x
		})
		.catch(error => {
			return []
		})
}

export interface CalculadoraImapctoOutput {
	totalEconomiaAluno: {
		economiaEnergia: number
		litrosAgua: number
		gee: number
		espacoAterro: number
		litrosPetroleo: number
	}
	totalEconomiaEscola: {
		economiaEnergia: number
		litrosAgua: number
		gee: number
		espacoAterro: number
		litrosPetroleo: number
	}
}

export async function valoresCalculadoraImpactoAluno(
	token: string,
): Promise<CalculadoraImapctoOutput> {
	return await axios
		.get(`${CLIENT_URL}/aluno/calculadoraImpacto`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then(res => {
			const x = res.data as CalculadoraImapctoOutput
			return x
		})
		.catch(error => {
			throw new Error(error)
		})
}

export async function confirmarResgate(token: string, idPremio: string) {
	return await axios
		.put(
			`${CLIENT_URL}/aluno/confResgate`,
			{
				idResgate: idPremio,
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
		.catch(error => {
			console.log(error)
			throw new Error(error)
		})
}

export async function entregarAtividade(token: string, idAtividade: string) {
	return await axios
		.post(
			`${CLIENT_URL}/aluno/entregaAtividade`,
			{
				idAtividade,
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
