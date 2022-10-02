import axios from 'axios'

export interface StudentData {
	id: string
	matricula: number
	nome: string
	sexo: string
	idade: number
	serie: string
	pontos: number
	imagemPerfil: null
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
		.get('https://recicla-cabrobo-backend.herokuapp.com/aluno', {
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
		.get('https://recicla-cabrobo-backend.herokuapp.com/aluno/rankingAlunos', {
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
		.get('https://recicla-cabrobo-backend.herokuapp.com/aluno/rankingAlunos', {
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
		.get('https://recicla-cabrobo-backend.herokuapp.com/aluno/listarEntregas', {
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
	dataEntrega?: string
}

export interface Award {
	id: string
	nome: string
	especificacao: string
	preco: string
}

export async function getStudentAwardHistory(token: string): Promise<AwardHistory[]> {
	return await axios
		.get('https://recicla-cabrobo-backend.herokuapp.com/aluno/listResgates', {
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
		.get('https://recicla-cabrobo-backend.herokuapp.com/premio/listar', {
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
