import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../store/context/authContext'
import { PublicRouter } from './public/PublicRouter'
import { RootBottomTabNavigator } from './RootBottomTabNavigator'

export function Navigation() {
	const authCtx = useContext(AuthContext)

	return authCtx.isAuthenticated ? (
		<NavigationContainer>
			<StatusBar style='dark' backgroundColor='#fff' />
			<RootBottomTabNavigator />
		</NavigationContainer>
	) : (
		<NavigationContainer>
			<StatusBar style='dark' backgroundColor='#fff' />
			<PublicRouter />
		</NavigationContainer>
	)
}
