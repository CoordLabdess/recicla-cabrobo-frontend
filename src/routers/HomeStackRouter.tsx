import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen } from '../screens'
import { RankingScreen } from '../screens/home/RankingScreen'

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
		</Stack.Navigator>
	)
}
