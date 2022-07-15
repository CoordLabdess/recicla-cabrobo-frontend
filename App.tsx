import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { RootBottomTabNavigator } from './src/routers/RootBottomTabNavigator'

export default function App() {
	return (
		<SafeAreaProvider>
			<View style={{ flex: 1, backgroundColor: '#fff' }}>
				<NavigationContainer>
					<StatusBar style='dark' backgroundColor='#fff' />
					<RootBottomTabNavigator />
				</NavigationContainer>
			</View>
		</SafeAreaProvider>
	)
}
