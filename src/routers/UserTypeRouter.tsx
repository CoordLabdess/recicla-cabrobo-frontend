import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React, { useContext, useState } from 'react'
import { COLORS } from '../constants/colors'
import { AnyScreen } from '../screens'
import { ProfessorRootBottomTabNavigator } from './professor/ProfessorRootBottomTabNavigator'
import { StudentRootBottomTabNavigator } from './student/StudentRootBottomTabNavigator'

type UserType = 'Student' | 'Professor' | 'School' | 'Admin'

export function UserTypeRouter() {
	const [userType, setUserType] = useState<UserType>('Professor')

	return userType === 'Student' ? (
		<NavigationContainer>
			<StatusBar style='dark' backgroundColor='#fff' />
			<StudentRootBottomTabNavigator />
		</NavigationContainer>
	) : userType === 'Professor' ? (
		<NavigationContainer>
			<StatusBar style='light' backgroundColor={COLORS.primary500} />
			<ProfessorRootBottomTabNavigator />
		</NavigationContainer>
	) : userType === 'School' ? (
		<NavigationContainer>
			<StatusBar style='light' backgroundColor={COLORS.primary500} />
			<AnyScreen />
		</NavigationContainer>
	) : userType === 'Admin' ? (
		<NavigationContainer>
			<StatusBar style='light' backgroundColor={COLORS.primary500} />
			<AnyScreen />
		</NavigationContainer>
	) : (
		<>
			<StatusBar style='light' backgroundColor={COLORS.primary500} />
			<AnyScreen />
		</>
	)
}
