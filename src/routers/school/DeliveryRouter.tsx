import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AnyScreen } from '../../screens'
import { NewDeliveryScreen } from '../../screens/school/delivery/NewDeliveryScreen'

const Stack = createNativeStackNavigator()

export function DeliveryStackRouter() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen
				name='Delivery1'
				component={NewDeliveryScreen}
				options={{
					title: 'Entrega de Materiais',
				}}
			/>
			<Stack.Screen
				name='Delivery2'
				component={AnyScreen}
				options={{
					title: 'Entrega de Materiais',
				}}
			/>
		</Stack.Navigator>
	)
}
