import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React, { useContext, useState } from 'react'
import { COLORS } from '../constants/colors'
import { AnyScreen } from '../screens'
import { SchoolRootBottomTabNavigator } from './school/SchoolRootBottomTabNavigator'
import { StudentRootBottomTabNavigator } from './student/StudentRootBottomTabNavigator'
import { AuthContext, AuthType } from '../store/context/authContext'

export function UserTypeRouter() {
	const [userType, setUserType] = useState<AuthType>('School')
	const AuthCtx = useContext(AuthContext)

	return AuthCtx.type === 'Student' ? (
		<NavigationContainer>
			<StatusBar style='dark' backgroundColor='#fff' />
			<StudentRootBottomTabNavigator />
		</NavigationContainer>
	) : AuthCtx.type === 'School' ? (
		<NavigationContainer>
			<StatusBar style='light' backgroundColor={COLORS.primary500} />
			<SchoolRootBottomTabNavigator />
		</NavigationContainer>
	) : (
		<NavigationContainer>
			<StatusBar style='light' backgroundColor={COLORS.primary500} />
			<AnyScreen />
		</NavigationContainer>
	)
}
