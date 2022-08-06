import { View, Text, ScrollView, FlatList, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TurboTaskClasssListItem } from '../../../components/turboTasks/TurboTaskClasssListItem'

export function TurboTasksClassesScreen() {
	return (
		<SafeAreaView style={styles.root}>
			<FlatList
				keyboardShouldPersistTaps='always'
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: 'flex-start',
					paddingHorizontal: '5%',
					alignItems: 'center',
				}}
				alwaysBounceVertical={false}
				showsVerticalScrollIndicator={false}
				data={[0, 1, 2, 3]}
				renderItem={itemData => (
					<TurboTaskClasssListItem isOpen lastUpdate={new Date()} class={'5º ano'} />
				)}
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
