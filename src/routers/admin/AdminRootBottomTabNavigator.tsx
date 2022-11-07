import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AnyScreen } from '../../screens'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../constants/colors'
import { Platform } from 'react-native'
import { useContext, useLayoutEffect } from 'react'
import { InicioScreen } from '../../screens/admin/InicioScreen'
import { AuthContext } from '../../store/context/authContext'
import { SchoolContext } from '../../store/context/schoolContext'
import { getSchoolDataFromToken, getSchoolPointsById } from '../../utils/school'
import { LoadingScreen } from '../../screens/ui/LoadingScreen'
import { GerenciarEstoqueScreen } from '../../screens/admin/GerenciarEstoqueScreen'
import { HistoricoResgateScreen } from '../../screens/admin/HistoricoResgatesScreen'

const BottomTab = createBottomTabNavigator()

export function AdminRootBottomTabNavigator() {
	const authCtx = useContext(AuthContext)
	const schoolCtx = useContext(SchoolContext)

	useLayoutEffect(() => {
		if (authCtx.token) {
			getSchoolDataFromToken(authCtx.token).then(res => {
				schoolCtx.updateSchoolData({
					email: res.email,
					id: res.id,
					nome: res.nome,
					nomeGestor: res.nomeGestor,
					points: 0,
					rank: -1,
					cpf: res.idLogin,
					type: 'School',
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
					display: 'none',
					backgroundColor: COLORS.primary500,
					height: Platform.OS === 'ios' ? 75 : 65,
				},
				tabBarInactiveTintColor: COLORS.secondary100,
				tabBarActiveTintColor: COLORS.secondary100,
			}}
		>
			<BottomTab.Screen
				name='AdminInicio'
				component={InicioScreen}
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
				name='AdminGerenciarEstoque'
				component={GerenciarEstoqueScreen}
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
				name='AdminHistoricoResgates'
				component={HistoricoResgateScreen}
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
				name='AdminOpcoes'
				component={GerenciarEstoqueScreen}
				options={{
					tabBarLabel: () => null,
					tabBarIcon: tabInfo => {
						return (
							<Ionicons
								name={tabInfo.focused ? 'file-tray-stacked-sharp' : 'file-tray-stacked-outline'}
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
