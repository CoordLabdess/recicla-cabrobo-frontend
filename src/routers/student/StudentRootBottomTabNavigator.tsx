import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeStackRouter } from './HomeStackRouter'
import { ProfileStackRouter } from '../ProfileStackRouter'
import { OptionsScreen, AnyScreen } from '../../screens'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../constants/colors'
import { Platform } from 'react-native'

const BottomTab = createBottomTabNavigator()

export function StudentRootBottomTabNavigator() {
	return (
		<BottomTab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarHideOnKeyboard: true,
				tabBarStyle: {
					display: 'none',
					backgroundColor: COLORS.primary500,
					height: Platform.OS === 'ios' ? 75 : 65,
				},
				tabBarInactiveTintColor: COLORS.secondary100,
				tabBarActiveTintColor: COLORS.secondary100,
			}}
		>
			<BottomTab.Screen
				name='RootInicio'
				component={HomeStackRouter}
				options={{
					tabBarLabel: () => null,
					tabBarIcon: tabInfo => {
						return (
							<Ionicons
								name={tabInfo.focused ? 'home-sharp' : 'home-outline'}
								size={40}
								color={tabInfo.color}
							/>
						)
					},
				}}
			/>
			<BottomTab.Screen
				name='RootPerfil'
				component={ProfileStackRouter}
				options={{
					tabBarLabel: () => null,
					tabBarIcon: tabInfo => {
						return (
							<Ionicons
								name={tabInfo.focused ? 'person-sharp' : 'person-outline'}
								size={40}
								color={tabInfo.color}
							/>
						)
					},
				}}
			/>
			<BottomTab.Screen
				name='RootMapa'
				component={AnyScreen}
				options={{
					tabBarLabel: () => null,
					tabBarIcon: tabInfo => {
						return (
							<Ionicons
								name={tabInfo.focused ? 'map-sharp' : 'map-outline'}
								size={40}
								color={tabInfo.color}
							/>
						)
					},
				}}
			/>
			<BottomTab.Screen
				name='RootOpcoes'
				component={OptionsScreen}
				options={{
					tabBarLabel: () => null,
					tabBarIcon: tabInfo => {
						return (
							<Ionicons
								name={tabInfo.focused ? 'options-sharp' : 'options-outline'}
								size={40}
								color={tabInfo.color}
							/>
						)
					},
				}}
			/>
		</BottomTab.Navigator>
	)
}
