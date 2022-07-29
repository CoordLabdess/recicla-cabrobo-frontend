import { View, Text, FlatList, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NotificationCard } from '../../../components/home/NotificationCard'
import { COLORS } from '../../../constants/colors'

export function SchoolHomeScreen() {
	return (
		<SafeAreaView style={styles.root}>
			<FlatList
				keyboardShouldPersistTaps='always'
				ListHeaderComponent={() => {
					return (
						<View style={{ alignItems: 'center', marginBottom: 20 }}>
							<Text style={{ fontWeight: '600', fontSize: 17, color: COLORS.primary500 }}>
								Escola Municipal Fulano de Tal
							</Text>
							<Text style={{ fontWeight: '600', fontSize: 17, color: COLORS.primary500 }}>
								Gestão
							</Text>
						</View>
					)
				}}
				contentContainerStyle={{
					flexGrow: 1,
					paddingVertical: 20,
					justifyContent: 'flex-start',
					paddingHorizontal: '5%',
					alignItems: 'center',
				}}
				alwaysBounceVertical={false}
				showsVerticalScrollIndicator={false}
				data={[0, 1, 2, 3]}
				renderItem={itemData => {
					return <NotificationCard title='oi' date={new Date()} goTo={''} />
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
