import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ChooseAwardScreen } from '../../screens/school/awards/ChooseAwardScreen'
import { ChooseStudentAwardScreen } from '../../screens/school/awards/ChooseStudentAwardScreen'
import { ConfirmStudentAwardScreen } from '../../screens/school/awards/ConfirmStudentScreen'
import { AnyScreen } from '../../screens'
import { ManageAwardsScreen } from '../../screens/school/awards/ManageAwardsScreen'
import { EditAwardScreen } from '../../screens/school/awards/EditAwardScreen'

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
				name='Award0'
				component={ManageAwardsScreen}
				options={{
					title: 'Resgate de Prêmios',
				}}
			/>
			<Stack.Screen
				name='Award1'
				component={ChooseStudentAwardScreen}
				options={{
					title: 'Resgate de Prêmios',
				}}
			/>
			<Stack.Screen
				name='Award2'
				component={ConfirmStudentAwardScreen}
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
			<Stack.Screen
				name='EditAward'
				component={EditAwardScreen}
				options={{
					title: 'Resgate de Prêmios',
				}}
			/>
		</Stack.Navigator>
	)
}
