import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ChooseAwardScreen } from '../../screens/school/awards/ChooseAwardScreen'
import { NewAwardScreen } from '../../screens/school/awards/NewAwardScreen'
import { ConfirmStudentScreen } from '../../screens/school/awards/ConfirmStudentScreen'
import { AnyScreen } from '../../screens'

const Stack = createNativeStackNavigator()

export function AwardStackRouter() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				animation: 'slide_from_right',
			}}
		>
			<Stack.Screen
				name='Award1'
				component={NewAwardScreen}
				options={{
					title: 'Resgate de Prêmios',
				}}
			/>
			<Stack.Screen
				name='Award2'
				component={ConfirmStudentScreen}
				options={{
					title: 'Resgate de Prêmios',
				}}
			/>
			<Stack.Screen
				name='Award3'
				component={ChooseAwardScreen}
				options={{
					title: 'Resgate de Prêmios',
				}}
			/>
			<Stack.Screen
				name='Award4'
				component={AnyScreen}
				options={{
					title: 'Resgate de Prêmios',
				}}
			/>
		</Stack.Navigator>
	)
}
