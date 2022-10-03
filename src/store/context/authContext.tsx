import React, { createContext, useState } from 'react'

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
	authenticate: () => {},
	logout: () => {},
})

export function AuthContextProvider(props: { children: React.ReactNode }) {
	const [authToken, setAuthToken] = useState<null | string>(null)
	const [authType, setAuthType] = useState<AuthType>(null)

	function authenticate(token: string, type: AuthType) {
		setAuthToken(token)
		setAuthType(type)
	}

	function logout() {
		setAuthToken(null)
	}

	const value: Auth = {
		token: authToken,
		type: authType,
		isAuthenticated: !!authToken,
		authenticate: authenticate,
		logout: logout,
	}

	return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
}
