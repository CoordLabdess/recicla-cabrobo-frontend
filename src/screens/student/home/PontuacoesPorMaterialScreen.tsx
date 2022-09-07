import {
	View,
	Text,
	StyleSheet,
	FlatList,
	ListRenderItemInfo,
	Pressable,
	ScrollView,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SimplePageHeader } from '../../../components/ui/SimplePageHeader'
import { materials } from '../../../data/materialTable'

export function PontuacaoPorMaterialScreen() {
	return (
		<SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
			<FlatList
				ListHeaderComponent={() => <SimplePageHeader title='Pontuação por Material' />}
				contentContainerStyle={{
					flexGrow: 1,
					paddingBottom: 20,
					justifyContent: 'flex-start',
					alignItems: 'center',
				}}
				alwaysBounceVertical={false}
				showsVerticalScrollIndicator={false}
				data={materials}
				numColumns={2}
				renderItem={itemData => {
					return (
						<View
							style={{
								margin: 10,
								borderRadius: 20,
								borderWidth: 2,
								borderColor:
									itemData.item.category === 'Plastic'
										? '#D63636'
										: itemData.item.category === 'Metal'
										? '#F0C93E'
										: '#2367CC',
								height: 150,
								width: 150,
								overflow: 'hidden',
								padding: 15,
								alignItems: 'center',
								justifyContent: 'space-evenly',
							}}
						>
							<Text
								style={{
									fontWeight: '600',
									fontSize: 18,
									color:
										itemData.item.category === 'Plastic'
											? '#D63636'
											: itemData.item.category === 'Metal'
											? '#F0C93E'
											: '#2367CC',
								}}
							>
								{itemData.item.title}
							</Text>
							<Text
								style={{
									fontWeight: '600',
									fontSize: 18,
									color:
										itemData.item.category === 'Plastic'
											? '#D63636'
											: itemData.item.category === 'Metal'
											? '#F0C93E'
											: '#2367CC',
								}}
							>
								{itemData.item.pointsPerKg}Pts/kg
							</Text>
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
	contentList: {
		backgroundColor: '#34123',
		flexGrow: 1,
	},
})
