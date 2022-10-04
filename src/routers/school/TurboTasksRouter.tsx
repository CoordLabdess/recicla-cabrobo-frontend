import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TurboTasksClassesScreen } from '../../screens/school/turboTasks/TurboTasksClassesScreen'
import { CriarAtividadeScreen } from '../../screens/school/turboTasks/CriarAtividadeScreen'
import { EditarAtividadeScreen } from '../../screens/school/turboTasks/EditarAtividadeScreen'

const Stack = createNativeStackNavigator()

export function TurboTasksRouter() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				animation: 'slide_from_right',
			}}
		>
			<Stack.Screen name='Atividades' component={TurboTasksClassesScreen} />
			<Stack.Screen name='CriarAtividade' component={CriarAtividadeScreen} />
			<Stack.Screen name='EditarAtividade' component={EditarAtividadeScreen} />
		</Stack.Navigator>
	)
}
