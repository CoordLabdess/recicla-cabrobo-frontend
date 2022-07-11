import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ProfileScreen } from '../screens'

const Stack = createNativeStackNavigator()

export function ProfileStackRouter() {
	return (
		<Stack.Navigator>
			<Stack.Screen name='Perfil' component={ProfileScreen} />
		</Stack.Navigator>
	)
}
