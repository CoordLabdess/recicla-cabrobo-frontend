import React, { createContext, useState } from 'react'

interface Auth {
	token: string | null
	isAuthenticated: boolean
	authenticate: (token: string) => void
	logout: () => void
}

export const AuthContext = createContext<Auth>({
	token: '',
	isAuthenticated: false,
	authenticate: () => {},
	logout: () => {},
})

export function AuthContextProvider(props: { children: React.ReactNode }) {
	const [authToken, setAuthToken] = useState<null | string>(null)

	function authenticate(token: string) {
		setAuthToken(token)
	}

	function logout() {
		setAuthToken(null)
	}

	const value: Auth = {
		token: authToken,
		isAuthenticated: !!authToken,
		authenticate: authenticate,
		logout: logout,
	}

	return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
}
