import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { RootBottomTabNavigator } from './src/routers/RootBottomTabNavigator'
import { useState } from 'react'
import { PublicRouter } from './src/routers/public/PublicRouter'

export default function App() {
	const [isLogged, setIsLogged] = useState(false)
	return (
		<SafeAreaProvider>
			<View style={{ flex: 1, backgroundColor: '#fff' }}>
				{isLogged ? (
					<NavigationContainer>
						<StatusBar style='dark' backgroundColor='#fff' />
						<RootBottomTabNavigator />
					</NavigationContainer>
				) : (
					<NavigationContainer>
						<StatusBar style='dark' backgroundColor='#fff' />
						<PublicRouter isLogged={isLogged} setIsLogged={setIsLogged} />
					</NavigationContainer>
				)}
			</View>
		</SafeAreaProvider>
	)
}
