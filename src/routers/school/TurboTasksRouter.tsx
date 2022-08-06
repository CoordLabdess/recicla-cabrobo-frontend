import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AnyScreen } from '../../screens'
import { ConfirmStudentScreen } from '../../screens/school/delivery/ConfirmStudentScreen'
import { InformMaterialsScreen } from '../../screens/school/delivery/InformMaterialsScreen'
import { NewDeliveryScreen } from '../../screens/school/delivery/NewDeliveryScreen'
import { TurboTasksClassesScreen } from '../../screens/school/turboTasks/TurboTasksClassesScreen'

const Stack = createNativeStackNavigator()

export function TurboTasksRouter() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				animation: 'slide_from_right',
			}}
		>
			<Stack.Screen
				name='EditTask'
				component={TurboTasksClassesScreen}
				options={{
					title: 'Entrega de Materiais',
				}}
			/>
		</Stack.Navigator>
	)
}
