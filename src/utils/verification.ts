import axios from 'axios'

export function isEmailValid(email: string) {
	return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) ? true : false
}

export function isPasswordLong(password: string) {
	return password.trim().length >= 6 ? true : false
}

export async function getStudentData(token: string) {
	const response = await axios.get('https://recicla-teste-back.herokuapp.com/aluno', {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
	return response.data
}
