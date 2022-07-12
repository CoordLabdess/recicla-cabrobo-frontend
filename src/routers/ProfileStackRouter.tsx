import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AnyScreen } from '../screens'

const Stack = createNativeStackNavigator()

export function ProfileStackRouter() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name='Perfil' component={AnyScreen} />
		</Stack.Navigator>
	)
}
