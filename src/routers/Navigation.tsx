import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React, { useContext } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { COLORS } from '../constants/colors'
import { AuthContext } from '../store/context/authContext'
import { PublicRouter } from './public/PublicRouter'
import { StudentRootBottomTabNavigator } from './student/StudentRootBottomTabNavigator'
import { UserTypeRouter } from './UserTypeRouter'

export function Navigation() {
	const authCtx = useContext(AuthContext)

	return authCtx.isAuthenticated ? (
		<>
			<UserTypeRouter />
		</>
	) : (
		<NavigationContainer>
			<StatusBar style='dark' backgroundColor='#fff' />

			<PublicRouter />
		</NavigationContainer>
	)
}
