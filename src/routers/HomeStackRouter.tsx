import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen } from '../screens'

const Stack = createNativeStackNavigator()

export function HomeStackRouter() {
	return (
		<Stack.Navigator>
			<Stack.Screen name='Inicio' component={HomeScreen} />
		</Stack.Navigator>
	)
}
