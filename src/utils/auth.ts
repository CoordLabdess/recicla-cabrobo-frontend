import axios from 'axios'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const API_KEY = 'AIzaSyDSY7X0UxEzruB1q3P34dbkYuuBR35Ag6w'

interface PayLoad {
	idToken: string
	email: string
	refreshToken: string
	expiresIn: string
	localId: string
	registered?: string
}

async function authenticate(
	mode: string,
	email: string,
	password: string,
	retunSecureToken = true,
) {
	const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`

	const response = await axios.post(url, {
		email,
		password,
		retunSecureToken,
	})
	const token = response.data.idToken as string
	return token
}

export function signUp(email: string, password: string, retunSecureToken = true) {
	return authenticate('signUp', email, password)
}

export async function signIn(email: string, password: string, returnSecureToken = true) {
	return authenticate('signInWithPassword', email, password)
}
