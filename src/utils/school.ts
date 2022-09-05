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
		.get('https://recicla-cabrobo-backend.herokuapp.com/escola/consultarAlunoMatricula', {
			params: {
				matricula: matricula,
			},
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then(res => {
			const x = res.data as StudentData
			return x
		})
		.catch(err => {
			throw new Error(err)
		})
}
