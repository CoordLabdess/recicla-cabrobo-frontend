import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { RootBottomTabNavigator } from './src/routers/RootBottomTabNavigator'

export default function App() {
	return (
		<NavigationContainer>
			<StatusBar style='auto' />
			<RootBottomTabNavigator />
		</NavigationContainer>
	)
}
