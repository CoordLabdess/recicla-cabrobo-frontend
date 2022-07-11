import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeStackRouter } from './HomeStackRouter'
import { ProfileStackRouter } from './ProfileStackRouter'
import { OptionsScreen, AnyScreen } from '../screens'

const BottomTab = createBottomTabNavigator()

export function RootBottomTabNavigator() {
	return (
		<BottomTab.Navigator
			screenOptions={{
				headerShown: false
			}}
		>
			<BottomTab.Screen name='RootInicio' component={HomeStackRouter} />
			<BottomTab.Screen name='RootPerfil' component={ProfileStackRouter} />
			<BottomTab.Screen name='RootMapa' component={AnyScreen} />
			<BottomTab.Screen name='RootOpcoes' component={OptionsScreen} />
		</BottomTab.Navigator>
	)
}
