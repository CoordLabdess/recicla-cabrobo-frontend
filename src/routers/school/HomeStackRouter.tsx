import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen } from '../../screens'
import { RankingScreen } from '../../screens/student/home/RankingScreen'
import { ImpactCalculator } from '../../screens/student/home/ImpactCalculator'
import { COLORS } from '../../constants/colors'
import { SchoolHomeScreen } from '../../screens/school/home/SchoolHomeScreen'
import { DeliveryHistoryScreen } from '../../screens/school/home/DeliveryHistoryScreen'
import { AwardsHistoryScreen } from '../../screens/school/home/AwardsHistoryScreen'
import { SchoolRankScreen } from '../../screens/school/home/SchoolRankScreen'

const Stack = createNativeStackNavigator()

export function HomeStackRouter() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name='Inicio' component={SchoolHomeScreen} />
			<Stack.Screen name='RankingEscolas' component={SchoolRankScreen} />
			<Stack.Screen name='HistoricoEntregasEscolas' component={DeliveryHistoryScreen} />
			<Stack.Screen name='HistoricoResgatesEscolas' component={AwardsHistoryScreen} />
		</Stack.Navigator>
	)
}
