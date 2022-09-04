import { KeyboardAvoidingView, Platform, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AuthContextProvider } from './src/store/context/authContext'
import { Navigation } from './src/routers/Navigation'

export default function App() {
	return (
		<SafeAreaProvider>
			<AuthContextProvider>
				{Platform.OS === 'ios' ? (
					<KeyboardAvoidingView
						behavior='padding'
						keyboardVerticalOffset={-50}
						style={{ flex: 1, backgroundColor: '#fff' }}
					>
						<Navigation />
					</KeyboardAvoidingView>
				) : (
					<View style={{ flex: 1, backgroundColor: '#fff' }}>
						<Navigation />
					</View>
				)}
			</AuthContextProvider>
		</SafeAreaProvider>
	)
}
