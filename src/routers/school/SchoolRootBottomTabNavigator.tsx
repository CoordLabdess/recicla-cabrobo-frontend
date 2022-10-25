import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeStackRouter } from './HomeStackRouter'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../constants/colors'
import { DeliveryStackRouter } from './DeliveryRouter'
import { ManageStudentsRouter } from './ManageStudentRouter'
import { TurboTasksRouter } from './TurboTasksRouter'
import { AwardStackRouter } from './AwardRouter'
import { Platform } from 'react-native'
import { useContext, useLayoutEffect } from 'react'
import { SchoolContext } from '../../store/context/schoolContext'
import { getSchoolDataFromToken, getSchoolPointsById } from '../../utils/school'
import { AuthContext } from '../../store/context/authContext'
import { LoadingScreen } from '../../screens/ui/LoadingScreen'

const BottomTab = createBottomTabNavigator()

export function SchoolRootBottomTabNavigator() {
	const authCtx = useContext(AuthContext)
	const schoolCtx = useContext(SchoolContext)

	useLayoutEffect(() => {
		if (authCtx.token) {
			getSchoolDataFromToken(authCtx.token).then(res => {
				getSchoolPointsById(schoolCtx.schoolData.id, authCtx.token as string).then(r => {
					schoolCtx.updateSchoolData({
						email: res.email,
						id: res.id,
						nome: res.nome,
						nomeGestor: res.nomeGestor,
						points: r,
						rank: -1,
						cpf: res.idLogin,
						type: 'School',
					})
				})
			})
		}
	}, [])

	if (!schoolCtx.schoolData.nome) {
		return <LoadingScreen />
	}

	return (
		<BottomTab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarHideOnKeyboard: true,
				tabBarStyle: {
					backgroundColor: COLORS.primary500,
					height: Platform.OS === 'ios' ? 90 : 65,
					paddingTop: Platform.OS === 'ios' ? 15 : 0,
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
				listeners={({ navigation }) => ({
					tabPress: event => {
						event.preventDefault()
						navigation.navigate('RootInicio', { screen: 'Inicio' })
					},
				})}
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
						navigation.navigate('RootTurboTasks', { screen: 'AtividadesInicio' })
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
