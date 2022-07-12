import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { RootBottomTabNavigator } from './src/routers/RootBottomTabNavigator'

export default function App() {
	return (
		<SafeAreaProvider>
			<NavigationContainer>
				<StatusBar style='auto' />
				<RootBottomTabNavigator />
			</NavigationContainer>
		</SafeAreaProvider>
	)
}
