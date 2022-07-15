import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AnyScreen, LoginScreen } from '../../screens'

const Stack = createNativeStackNavigator()

interface PublicRouterProps {
	isLogged: boolean
	setIsLogged: React.Dispatch<React.SetStateAction<boolean>>
}

export function PublicRouter(props: PublicRouterProps) {
	function LoginPage() {
		return <LoginScreen isLogged={props.isLogged} setIsLogged={props.setIsLogged} />
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
