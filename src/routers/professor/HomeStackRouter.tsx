import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen } from '../../screens'
import { RankingScreen } from '../../screens/student/home/RankingScreen'
import { ImpactCalculator } from '../../screens/student/home/ImpactCalculator'
import { COLORS } from '../../constants/colors'
import { ProfessorHomeScreen } from '../../screens/professor/home/ProfessorHomeScreen'

const Stack = createNativeStackNavigator()

export function HomeStackRouter() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name='Inicio' component={ProfessorHomeScreen} />
		</Stack.Navigator>
	)
}
