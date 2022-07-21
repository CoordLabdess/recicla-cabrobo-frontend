import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SimplePageHeader } from '../components/ui/SimplePageHeader'

export function AnyScreen() {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<SimplePageHeader title='Any Screen' />
			<Text>Any Screen</Text>
		</SafeAreaView>
	)
}
