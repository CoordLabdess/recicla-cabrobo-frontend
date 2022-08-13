import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeStackRouter } from './HomeStackRouter'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../constants/colors'
import { DeliveryStackRouter } from './DeliveryRouter'
import { ManageStudentsRouter } from './ManageStudentRouter'
import { TurboTasksRouter } from './TurboTasksRouter'
import { AwardStackRouter } from './AwardRouter'

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
				component={ManageStudentsRouter}
				listeners={({ navigation }) => ({
					tabPress: event => {
						event.preventDefault()
						navigation.navigate('RootAlunos', { screen: 'ManageStudents' })
					},
				})}
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
				listeners={({ navigation }) => ({
					tabPress: event => {
						event.preventDefault()
						navigation.navigate('RootNewDelivery', { screen: 'Delivery0' })
					},
				})}
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
				name='RootTurboTasks'
				component={TurboTasksRouter}
				listeners={({ navigation }) => ({
					tabPress: event => {
						event.preventDefault()
						navigation.navigate('RootTurboTasks', { screen: 'TurboTasks' })
					},
				})}
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
				name='RootAwards'
				component={AwardStackRouter}
				listeners={({ navigation }) => ({
					tabPress: event => {
						event.preventDefault()
						navigation.navigate('RootAwards', { screen: 'Award0' })
					},
				})}
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
