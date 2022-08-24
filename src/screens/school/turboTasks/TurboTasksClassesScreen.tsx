import { View, Text, ScrollView, FlatList, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TurboTaskClasssListItem } from '../../../components/turboTasks/TurboTaskClasssListItem'
import { RoundIconButton } from '../../../components/ui/RoundIconButton'
import { SimplePageHeader } from '../../../components/ui/SimplePageHeader'
import { turboTasks } from '../../../data/turboTasks'
import { useNavigation } from '@react-navigation/native'
import { COLORS } from '../../../constants/colors'

export function TurboTasksClassesScreen() {
	const navigation = useNavigation()
	return (
		<SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
			<FlatList
				ListHeaderComponent={() => (
					<SimplePageHeader textStyle={styles.title} dontShowGoBack title='Atividades Turbinadas' />
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
			<View
				style={{ position: 'absolute', bottom: 0, right: 0, marginRight: 25, marginBottom: 25 }}
			>
				<RoundIconButton
					size={52}
					onPress={() =>
						navigation.navigate('TurboTaskConfig' as never, { mode: 'create' } as never)
					}
				/>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: '#fff',
	},
	title: {
		fontSize: 20,
		color: COLORS.primary500,
		fontWeight: '600',
	},
})
