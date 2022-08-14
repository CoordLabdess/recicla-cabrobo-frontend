import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen } from '../../screens'
import { RankingScreen } from '../../screens/student/home/RankingScreen'
import { ImpactCalculator } from '../../screens/student/home/ImpactCalculator'
import { COLORS } from '../../constants/colors'
import { SchoolHomeScreen } from '../../screens/school/home/SchoolHomeScreen'

const Stack = createNativeStackNavigator()

export function HomeStackRouter() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name='Inicio' component={SchoolHomeScreen} />
			<Stack.Screen name='RankingEscolas' component={RankingScreen} />
		</Stack.Navigator>
	)
}
