import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export function AnyScreen() {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Text>Any Screen</Text>
		</SafeAreaView>
	)
}
