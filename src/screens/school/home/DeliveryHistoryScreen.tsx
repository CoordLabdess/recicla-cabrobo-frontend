import { FlatList, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { History } from '../../../components/home/History'
import { SimplePageHeader } from '../../../components/ui/SimplePageHeader'

interface History {
	date: Date
	description: string
	points: number
}

const historyData: History[] = [
	{
		date: new Date(),
		description:
			'Fulano da Silva Sauro, 8º ano, entregou 10kg de metal, 5kg de plástico, 2kg de pilha e 1k de papel.',
		points: 120,
	},
	{
		date: new Date(),
		description:
			'Fulano da Silva Sauro, 8º ano, entregou 10kg de metal, 5kg de plástico, 2kg de pilha e 1k de papel.',
		points: 120,
	},
	{
		date: new Date(),
		description:
			'Fulano da Silva Sauro, 8º ano, entregou 10kg de metal, 5kg de plástico, 2kg de pilha e 1k de papel.',
		points: 120,
	},
	{
		date: new Date(),
		description:
			'Fulano da Silva Sauro, 8º ano, entregou 10kg de metal, 5kg de plástico, 2kg de pilha e 1k de papel.',
		points: 120,
	},
	{
		date: new Date(),
		description:
			'Fulano da Silva Sauro, 8º ano, entregou 10kg de metal, 5kg de plástico, 2kg de pilha e 1k de papel.',
		points: 120,
	},
	{
		date: new Date(),
		description:
			'Fulano da Silva Sauro, 8º ano, entregou 10kg de metal, 5kg de plástico, 2kg de pilha e 1k de papel.',
		points: 120,
	},
	{
		date: new Date(),
		description:
			'Fulano da Silva Sauro, 8º ano, entregou 10kg de metal, 5kg de plástico, 2kg de pilha e 1k de papel.',
		points: 120,
	},
	{
		date: new Date(),
		description:
			'Fulano da Silva Sauro, 8º ano, entregou 10kg de metal, 5kg de plástico, 2kg de pilha e 1k de papel.',
		points: 120,
	},
	{
		date: new Date(),
		description:
			'Fulano da Silva Sauro, 8º ano, entregou 10kg de metal, 5kg de plástico, 2kg de pilha e 1k de papel.',
		points: 120,
	},
	{
		date: new Date(),
		description:
			'Fulano da Silva Sauro, 8º ano, entregou 10kg de metal, 5kg de plástico, 2kg de pilha e 1k de papel.',
		points: 120,
	},
]

export function DeliveryHistoryScreen() {
	const fakeHistory = {
		date: new Date(),
		description: '',
		points: 0,
	}
	return (
		<SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
			<FlatList
				ListHeaderComponent={() => <SimplePageHeader title='Histórico de Entregas' />}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ width: '100%' }}
				alwaysBounceVertical={false}
				data={historyData}
				style={styles.contentList}
				renderItem={itemData => (
					<History last={itemData.index + 1 >= historyData.length} itemData={itemData} />
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
	contentList: {
		backgroundColor: '#fff',
		flexGrow: 1,
	},
})
