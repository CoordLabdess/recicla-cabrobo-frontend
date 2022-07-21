import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AnyScreen } from '../../screens'
import { ConfirmStudentScreen } from '../../screens/school/delivery/ConfirmStudentScreen'
import { InformMaterialsScreen } from '../../screens/school/delivery/InformMaterialsScreen'
import { NewDeliveryScreen } from '../../screens/school/delivery/NewDeliveryScreen'

const Stack = createNativeStackNavigator()

export function DeliveryStackRouter() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				animation: 'slide_from_right',
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
				component={ConfirmStudentScreen}
				options={{
					title: 'Entrega de Materiais',
				}}
			/>
			<Stack.Screen
				name='Delivery3'
				component={InformMaterialsScreen}
				options={{
					title: 'Entrega de Materiais',
				}}
			/>
		</Stack.Navigator>
	)
}
