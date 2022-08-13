import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TurboTaskConfigScreen } from '../../screens/school/turboTasks/TurboTaskConfigScreen'
import { AnyScreen } from '../../screens'
import { ConfirmStudentScreen } from '../../screens/school/delivery/ConfirmStudentScreen'
import { InformMaterialsScreen } from '../../screens/school/delivery/InformMaterialsScreen'
import { ChooseStudentScreen } from '../../screens/school/delivery/ChooseStudentScreen'
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
			<Stack.Screen name='TurboTasks' component={TurboTasksClassesScreen} />
			<Stack.Screen name='TurboTaskConfig' component={TurboTaskConfigScreen} />
		</Stack.Navigator>
	)
}
