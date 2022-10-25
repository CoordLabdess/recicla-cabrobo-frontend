import axios from 'axios'
import { CLIENT_URL } from './client'

export function isEmailValid(email: string) {
	return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) ? true : false
}

export function isPasswordLong(password: string) {
	return password.trim().length >= 6 ? true : false
}

export async function getStudentData(token: string) {
	const response = await axios.get(`${CLIENT_URL}/aluno`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
	return response.data
}
