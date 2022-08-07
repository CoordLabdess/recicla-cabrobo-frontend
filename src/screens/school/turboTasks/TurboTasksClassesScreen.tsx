import { View, Text, ScrollView, FlatList, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TurboTaskClasssListItem } from '../../../components/turboTasks/TurboTaskClasssListItem'
import { SimplePageHeader } from '../../../components/ui/SimplePageHeader'
import { turboTasks } from '../../../data/turboTasks'

export function TurboTasksClassesScreen() {
	return (
		<SafeAreaView style={styles.root}>
			<FlatList
				ListHeaderComponent={() => (
					<SimplePageHeader dontShowGoBack title='Atividades Turbinadas' />
				)}
				keyboardShouldPersistTaps='always'
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: 'flex-start',
					paddingHorizontal: '5%',
					alignItems: 'center',
				}}
				alwaysBounceVertical={false}
				showsVerticalScrollIndicator={false}
				data={turboTasks}
				renderItem={itemData => <TurboTaskClasssListItem turboTask={itemData.item} />}
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
