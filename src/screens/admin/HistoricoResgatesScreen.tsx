import { View, Text, FlatList, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export function HistoricoResgateScreen() {
	return (
		<SafeAreaView style={styles.root} edges={['top', 'right', 'left']}>
			<FlatList
				data={[0, 1, 2]}
				renderItem={itemData => {
					const item = itemData.item
					return (
						<View>
							<Text>{item}</Text>
						</View>
					)
				}}
			/>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: '#fff',
	},
})
