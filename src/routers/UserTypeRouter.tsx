import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React, { useContext, useState } from 'react'
import { COLORS } from '../constants/colors'
import { AnyScreen } from '../screens'
import { SchoolRootBottomTabNavigator } from './school/SchoolRootBottomTabNavigator'
import { StudentRootBottomTabNavigator } from './student/StudentRootBottomTabNavigator'
import { AuthContext, AuthType } from '../store/context/authContext'
import { StudentContext, StudentContextProvider } from '../store/context/studentContext'
import { KeyboardAvoidingView } from 'react-native'
import { SchoolContextProvider } from '../store/context/schoolContext'

export function UserTypeRouter() {
	const AuthCtx = useContext(AuthContext)

	return AuthCtx.type === 'Student' ? (
		<NavigationContainer>
			<StudentContextProvider>
				<StatusBar style='dark' backgroundColor='#fff' />
				<StudentRootBottomTabNavigator />
			</StudentContextProvider>
		</NavigationContainer>
	) : AuthCtx.type === 'School' ? (
		<NavigationContainer>
			<SchoolContextProvider>
				<StatusBar style='dark' backgroundColor='#fff' />
				<SchoolRootBottomTabNavigator />
			</SchoolContextProvider>
		</NavigationContainer>
	) : (
		<NavigationContainer>
			<StatusBar style='light' backgroundColor={COLORS.primary500} />
			<AnyScreen />
		</NavigationContainer>
	)
}
