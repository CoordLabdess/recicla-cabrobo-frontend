import React, { createContext, useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store'
import * as SplashScreen from 'expo-splash-screen'
export type AuthType = 'Student' | 'School' | 'Admin' | null

interface Auth {
	token: string | null
	type: AuthType
	isAuthenticated: boolean
	authenticate: (token: string, type: AuthType) => void
	logout: () => void
}

export const AuthContext = createContext<Auth>({
	token: '',
	type: null,
	isAuthenticated: false,
	authenticate: () => { },
	logout: () => { },
})

export function AuthContextProvider(props: { children: React.ReactNode }) {
	const [authToken, setAuthToken] = useState<null | string>(null)
	const [authType, setAuthType] = useState<AuthType>(null)

	async function authenticate(token: string, type: AuthType) {
		await SecureStore.setItemAsync('token', token)
		await SecureStore.setItemAsync('type', type || "")
		setAuthToken(token)
		setAuthType(type)
	}

	async function logout() {
		setAuthToken(null)
		await SecureStore.deleteItemAsync('token')
		await SecureStore.deleteItemAsync('type')
	}

	async function fetchToken() {
		try {
			SplashScreen.preventAutoHideAsync()

			const token = await SecureStore.getItemAsync('token')
			const type = await SecureStore.getItemAsync('type')
			if (token && type) {
				setAuthType(type as AuthType)
				setAuthToken(token)
			} else {
				setAuthToken(null)
				setAuthType(null)
			}
		} catch (error) {
			console.log(error)
		} finally {
			SplashScreen.hideAsync()
		}
	}

	useEffect(() => {
		fetchToken()
	}, [])

	const value: Auth = {
		token: authToken,
		type: authType,
		isAuthenticated: !!authToken,
		authenticate: authenticate,
		logout: logout,
	}

	return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
}
