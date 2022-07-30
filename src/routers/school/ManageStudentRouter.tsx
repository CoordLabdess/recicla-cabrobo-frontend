import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ManageStudentsScreen } from '../../screens/school/students/ManageStudentsScreen'

const Stack = createNativeStackNavigator()

export function ManageStudentsRouter() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name='ManageStudents' component={ManageStudentsScreen} />
		</Stack.Navigator>
	)
}
