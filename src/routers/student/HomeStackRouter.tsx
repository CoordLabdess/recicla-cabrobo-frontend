import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen } from '../../screens'
import { RankingScreen } from '../../screens/student/home/RankingScreen'
import { ImpactCalculator } from '../../screens/student/home/ImpactCalculator'
import { COLORS } from '../../constants/colors'

const Stack = createNativeStackNavigator()

export function HomeStackRouter() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name='Inicio' component={HomeScreen} />
			<Stack.Screen
				name='Ranking'
				component={RankingScreen}
				options={{
					animation: 'slide_from_bottom',
				}}
			/>
			<Stack.Screen
				name='ImpactCalculator'
				component={ImpactCalculator}
				options={{
					title: 'Calculadora de Impacto',
					headerShown: false,
					headerTintColor: COLORS.secondary500,

					headerTitleAlign: 'center',
					animation: 'slide_from_right',
				}}
			/>
		</Stack.Navigator>
	)
}
