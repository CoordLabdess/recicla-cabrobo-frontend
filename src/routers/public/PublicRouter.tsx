import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AnyScreen, LoginScreen } from '../../screens'
import { RegisterScreen } from '../../screens/public/RegisterScreen'

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
			<Stack.Screen
				name='Register'
				component={RegisterScreen}
				options={{
					animation: 'slide_from_bottom',
				}}
			/>
		</Stack.Navigator>
	)
}
