import React, { useState, createContext } from 'react'

export const AuthContext = createContext({
	isLogged: false,
	login: () => {},
	logout: () => {},
})

export function AuthContextProvider(props: { children: React.ReactNode; value: boolean }) {
	const [isLogged, setIsLogged] = useState(false)

	function login() {
		setIsLogged(true)
	}

	function logout() {
		setIsLogged(false)
	}

	const value = {
		isLogged: isLogged,
		login: login,
		logout: logout,
	}

	return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
}
