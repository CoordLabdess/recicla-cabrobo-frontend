import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AnyScreen } from '../../screens'
import { ManageStudentsScreen } from '../../screens/school/students/ManageStudentsScreen'
import { SearchStudentsScreen } from '../../screens/school/students/SearchStudentsScreen'
import { StudentProfileScreen } from '../../screens/school/students/StudentProfileScreen'

const Stack = createNativeStackNavigator()

export function ManageStudentsRouter() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				animation: 'slide_from_right',
			}}
		>
			<Stack.Screen name='ManageStudents' component={ManageStudentsScreen} />
			<Stack.Screen name='SearchStudent' component={SearchStudentsScreen} />
			<Stack.Screen name='StudentProfileInfo' component={StudentProfileScreen} />
		</Stack.Navigator>
	)
}
