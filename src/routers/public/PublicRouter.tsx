import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AnyScreen, LoginScreen } from '../../screens'

const Stack = createNativeStackNavigator()

export function PublicRouter() {
	function LoginPage() {
		return <LoginScreen />
	}
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name='Login' component={LoginPage} />
			<Stack.Screen name='Register' component={AnyScreen} />
		</Stack.Navigator>
	)
}
