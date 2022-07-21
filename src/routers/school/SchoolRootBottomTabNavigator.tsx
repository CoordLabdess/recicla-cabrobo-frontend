import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeStackRouter } from './HomeStackRouter'
import { ProfileStackRouter } from '../ProfileStackRouter'
import { OptionsScreen, AnyScreen } from '../../screens'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../constants/colors'
import { NewDeliveryScreen } from '../../screens/school/delivery/NewDeliveryScreen'
import { DeliveryStackRouter } from './DeliveryRouter'

const BottomTab = createBottomTabNavigator()

export function SchoolRootBottomTabNavigator() {
	return (
		<BottomTab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarHideOnKeyboard: true,
				tabBarStyle: {
					backgroundColor: COLORS.primary500,
					height: 65,
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
				name='RootAlunos'
				component={AnyScreen}
				options={{
					tabBarLabel: () => null,
					tabBarIcon: tabInfo => {
						return (
							<Ionicons
								name={tabInfo.focused ? 'people-sharp' : 'people-outline'}
								size={40}
								color={tabInfo.color}
							/>
						)
					},
				}}
			/>
			<BottomTab.Screen
				name='RootNewDelivery'
				component={DeliveryStackRouter}
				options={{
					tabBarLabel: () => null,
					tabBarIcon: tabInfo => {
						return (
							<Ionicons
								name={tabInfo.focused ? 'add-circle-sharp' : 'add-circle-outline'}
								size={40}
								color={tabInfo.color}
							/>
						)
					},
				}}
			/>
			<BottomTab.Screen
				name='RootTasks'
				component={AnyScreen}
				options={{
					tabBarLabel: () => null,
					tabBarIcon: tabInfo => {
						return (
							<Ionicons
								name={tabInfo.focused ? 'reader-sharp' : 'reader-outline'}
								size={40}
								color={tabInfo.color}
							/>
						)
					},
				}}
			/>
			<BottomTab.Screen
				name='RootGifts'
				component={OptionsScreen}
				options={{
					tabBarLabel: () => null,
					tabBarIcon: tabInfo => {
						return (
							<Ionicons
								name={tabInfo.focused ? 'gift-sharp' : 'gift-outline'}
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
