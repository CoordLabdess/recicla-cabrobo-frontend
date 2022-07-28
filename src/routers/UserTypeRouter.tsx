import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React, { useContext, useState } from 'react'
import { COLORS } from '../constants/colors'
import { AnyScreen } from '../screens'
import { SchoolRootBottomTabNavigator } from './school/SchoolRootBottomTabNavigator'
import { StudentRootBottomTabNavigator } from './student/StudentRootBottomTabNavigator'

type UserType = 'Student' | 'School'

export function UserTypeRouter() {
	const [userType, setUserType] = useState<UserType>('Student')

	return userType === 'Student' ? (
		<NavigationContainer>
			<StatusBar style='dark' backgroundColor='#fff' />
			<StudentRootBottomTabNavigator />
		</NavigationContainer>
	) : userType === 'School' ? (
		<NavigationContainer>
			<StatusBar style='light' backgroundColor={COLORS.primary500} />
			<SchoolRootBottomTabNavigator />
		</NavigationContainer>
	) : (
		<>
			<StatusBar style='light' backgroundColor={COLORS.primary500} />
			<AnyScreen />
		</>
	)
}
