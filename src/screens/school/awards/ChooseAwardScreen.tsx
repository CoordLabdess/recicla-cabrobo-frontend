import { View, Text, StyleSheet, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export function ChooseAwardScreen() {
	return (
		<SafeAreaView>
			<FlatList
				keyboardShouldPersistTaps='handled'
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: 'flex-start',
					paddingHorizontal: '5%',
					alignItems: 'center',
					paddingBottom: 20,
				}}
				alwaysBounceVertical={false}
				showsVerticalScrollIndicator={false}
				data={[0, 1, 2, 3]}
				renderItem={itemData => <Text>{itemData.item}</Text>}
			/>
		</SafeAreaView>
	)
}
