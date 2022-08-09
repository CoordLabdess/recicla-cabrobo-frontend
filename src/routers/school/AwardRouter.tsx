import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AnyScreen } from '../../screens'
import { ChooseAwardScreen } from '../../screens/school/awards/ChooseAwardScreen'
import { NewAwardScreen } from '../../screens/school/awards/NewAwardScreen'
import { ConfirmStudentScreen } from '../../screens/school/delivery/ConfirmStudentScreen'
import { InformMaterialsScreen } from '../../screens/school/delivery/InformMaterialsScreen'
import { NewDeliveryScreen } from '../../screens/school/delivery/NewDeliveryScreen'

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
				component={ChooseAwardScreen}
				options={{
					title: 'Resgate de Prêmios',
				}}
			/>
		</Stack.Navigator>
	)
}
