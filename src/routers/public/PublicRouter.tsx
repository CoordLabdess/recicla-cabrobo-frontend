import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AnyScreen, LoginScreen } from '../../screens'
import { RegisterScreen } from '../../screens/public/RegisterScreen'
import { LoadingScreen } from '../../screens/ui/LoadingScreen'

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
			<Stack.Screen
				name='Login'
				component={LoginPage}
				options={{
					animation: 'none',
				}}
			/>
			<Stack.Screen
				name='SignUp'
				component={RegisterScreen}
				options={{
					animation: 'fade',
				}}
			/>
		</Stack.Navigator>
	)
}
