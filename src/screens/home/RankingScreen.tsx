import { View, Text, StyleSheet, FlatList, ListRenderItemInfo, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { ProfileHeader } from '../../components/home/ProfileHeader'
import { RankElement } from '../../components/home/RankElement'
import { Ionicons } from '@expo/vector-icons'

interface Rank {
	name: string
	position: number
	points: number
}

function Ranking(itemData: ListRenderItemInfo<Rank>) {
	return <RankElement itemData={itemData} />
}

const rankins: Rank[] = [
	{
		name: 'Fulano da Silva Sauro',
		position: 1,
		points: 1000,
	},
	{
		name: 'Fulano da Silva Sauro',
		position: 2,
		points: 1000,
	},
	{
		name: 'Fulano da Silva Sauro',
		position: 3,
		points: 1000,
	},
	{
		name: 'Fulano da Silva Sauro',
		position: 5,
		points: 1000,
	},
	{
		name: 'Fulano da Silva Sauro',
		position: 6,
		points: 1000,
	},
	{
		name: 'Fulano da Silva Sauro',
		position: 7,
		points: 1000,
	},
	{
		name: 'Fulano da Silva Sauro',
		position: 8,
		points: 1000,
	},
	{
		name: 'Fulano da Silva Sauro',
		position: 9,
		points: 1000,
	},
	{
		name: 'Fulano da Silva Sauro',
		position: 10,
		points: 1000,
	},
	{
		name: 'Fulano da Silva Sauro',
		position: 11,
		points: 1000,
	},
]

export function RankingScreen() {
	const navigation = useNavigation()
	return (
		<SafeAreaView style={styles.root}>
			<FlatList
				ListHeaderComponent={() => (
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							paddingHorizontal: 20,
							marginVertical: 20,
						}}
					>
						<Pressable
							style={{ alignItems: 'center', flexDirection: 'row' }}
							onPress={() => {
								navigation.goBack()
							}}
						>
							<Ionicons name='arrow-back' size={32} color='#838495' />
						</Pressable>
						<Text
							style={{ fontSize: 22, color: '#838495', textAlign: 'center', marginVertical: 10 }}
						>
							Ranking dos Alunos
						</Text>
						<View style={{ opacity: 0, alignItems: 'center', flexDirection: 'row' }}>
							<Ionicons name='arrow-back' size={32} color='#838495' />
						</View>
					</View>
				)}
				alwaysBounceVertical={false}
				style={styles.contentList}
				data={rankins}
				showsVerticalScrollIndicator={false}
				renderItem={Ranking}
			/>
		</SafeAreaView>
	)
}
const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
	contentList: {
		backgroundColor: '#34123',
		flexGrow: 1,
	},
})
