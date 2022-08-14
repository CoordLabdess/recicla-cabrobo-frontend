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
		.get('https://recicla-teste-back.herokuapp.com/aluno', {
			headers: { Authorization: `Bearer ${token}` },
		})
		.then(res => {
			return res.data
		})
		.catch(error => {
			throw new Error(error)
		})
}
