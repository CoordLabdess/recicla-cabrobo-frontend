import axios from 'axios'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ErrorMessage } from '../components/ui/ErrorMessage'
import { useContext } from 'react'
import { AuthContext, AuthType } from '../store/context/authContext'

const API_KEY = 'AIzaSyDSY7X0UxEzruB1q3P34dbkYuuBR35Ag6w'

interface PayLoad {
	idToken: string
	identificador: string
	refreshToken: string
	expiresIn: string
	localId: string
	registered?: string
}

async function authenticate(
	mode: string,
	identificador: string,
	password: string,
	retunSecureToken = true,
) {
	const url =
		mode === 'signInWithPassword'
			? 'https://recicla-teste-back.herokuapp.com/login'
			: `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`

	const response = await axios.post(url, {
		identificador,
		password,
	})
	const token = response.data.escolaAccessToken
		? response.data.escolaAccessToken
		: response.data.alunoAccessToken
	return token
}

export function signUp(identificador: string, password: string, retunSecureToken = true) {
	return authenticate('signUp', identificador, password)
}

function getAuthType(data: any): { token: string; type: AuthType } {
	try {
		if (data.escolaAccessToken) {
			return { token: data.escolaAccessToken, type: 'Student' }
		} else if (data.alunoAccessToken) {
			return { token: data.alunoAccessToken, type: 'Student' }
		} else {
			return { token: '', type: null }
		}
	} catch {
		throw new Error('Não foi possível verificar o usuário')
	}
}

export async function signIn(identificador: string, password: string, returnSecureToken = true) {
	const url = 'https://recicla-teste-back.herokuapp.com/login'
	const response = await axios.post(url, {
		identificador,
		password,
	})

	return getAuthType(response.data)
}
