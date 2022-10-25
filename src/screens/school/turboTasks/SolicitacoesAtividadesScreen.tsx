import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SimplePageHeader } from '../../../components/ui/SimplePageHeader'

export function SolicitacoesAtividadesScreen() {
	return (
		<SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
			<ScrollView
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: 'flex-start',
					paddingHorizontal: '5%',
					alignItems: 'center',
				}}
				alwaysBounceVertical={false}
				showsVerticalScrollIndicator={false}
			>
				<SimplePageHeader title='Solicitações de Entrega' />
				<View>
					<Text>Oioioi</Text>
				</View>
				<View>
					<Text>Oioioi</Text>
				</View>
				<View>
					<Text>Oioioi</Text>
				</View>
				<View>
					<Text>Oioioi</Text>
				</View>
				<View>
					<Text>Oioioi</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: '#fff',
	},
})
