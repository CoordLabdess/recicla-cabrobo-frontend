import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen } from '../../screens'
import { RankingScreen } from '../../screens/student/home/RankingScreen'
import { ImpactCalculator } from '../../screens/student/home/ImpactCalculator'
import { COLORS } from '../../constants/colors'
import { PremiosDisponiveisScreen } from '../../screens/student/home/PremiosDisponiveisScreen'
import { PontuacaoPorMaterialScreen } from '../../screens/student/home/PontuacoesPorMaterialScreen'
import { PontuacaoTurbinadaScreen } from '../../screens/student/home/PontuacaoTurbinadaScreen'
import { PontuacaoTurbinadaDetalhesScreen } from '../../screens/student/home/PontuacaoTurbinadaDetalhesScreen'

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
			<Stack.Screen
				name='PontuacaoTurbinada'
				component={PontuacaoTurbinadaScreen}
				options={{
					title: 'Pontuação Turbinada',
					headerShown: false,
					headerTintColor: COLORS.secondary500,
					headerTitleAlign: 'center',
					animation: 'slide_from_right',
				}}
			/>
			<Stack.Screen
				name='PontuacaoTurbinadaDetalhes'
				component={PontuacaoTurbinadaDetalhesScreen}
				options={{
					title: 'Detalhes da Atividade',
					headerShown: false,
					headerTintColor: COLORS.secondary500,
					headerTitleAlign: 'center',
					animation: 'slide_from_right',
				}}
			/>
			<Stack.Screen
				name='PremiosDisponiveis'
				component={PremiosDisponiveisScreen}
				options={{
					title: 'Prêmios Disponíveis',
					headerShown: false,
					headerTintColor: COLORS.secondary500,
					headerTitleAlign: 'center',
					animation: 'slide_from_right',
				}}
			/>
			<Stack.Screen
				name='PontuacaoPorMaterial'
				component={PontuacaoPorMaterialScreen}
				options={{
					title: 'Pontuação por Material',
					headerShown: false,
					headerTintColor: COLORS.secondary500,
					headerTitleAlign: 'center',
					animation: 'slide_from_right',
				}}
			/>
		</Stack.Navigator>
	)
}
