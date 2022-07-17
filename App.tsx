import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { RootBottomTabNavigator } from './src/routers/RootBottomTabNavigator'
import { useState } from 'react'
import { PublicRouter } from './src/routers/public/PublicRouter'
import { AuthContext, AuthContextProvider } from './store/context/authContext'
import { Navigation } from './src/routers/Navigation'

export default function App() {
	return (
		<SafeAreaProvider>
			<AuthContextProvider>
				<View style={{ flex: 1, backgroundColor: '#fff' }}>
					<Navigation />
				</View>
			</AuthContextProvider>
		</SafeAreaProvider>
	)
}
