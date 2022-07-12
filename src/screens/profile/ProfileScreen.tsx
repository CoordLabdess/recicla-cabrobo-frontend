import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../constants/colors'
import { ProfileHeader } from '../../components/profile/ProfileHeader'
import { UserStatus } from '../../components/profile/UserStatus'
import { ProfileActions } from '../../components/profile/ProfileActions'
import { History } from '../../components/profile/History'

interface History {
	date: Date
	description: string
	points: number
}

const historyData: History[] = [
	{
		date: new Date(),
		description: 'Entregues 10kg de chumbo, 5kg de plástico, 2kg de pilha e 1k de papel.',
		points: 120,
	},
	{
		date: new Date(),
		description: 'Entregues 10kg de chumbo, 5kg de plástico, 2kg de pilha e 1k de papel.',
		points: 120,
	},
	{
		date: new Date(),
		description: 'Entregues 10kg de chumbo, 5kg de plástico, 2kg de pilha e 1k de papel.',
		points: 120,
	},
	{
		date: new Date(),
		description: 'Entregues 10kg de chumbo, 5kg de plástico, 2kg de pilha e 1k de papel.',
		points: 120,
	},
	{
		date: new Date(),
		description: 'Entregues 10kg de chumbo, 5kg de plástico, 2kg de pilha e 1k de papel.',
		points: 120,
	},
	{
		date: new Date(),
		description: 'Entregues 10kg de chumbo, 5kg de plástico, 2kg de pilha e 1k de papel.',
		points: 120,
	},
	{
		date: new Date(),
		description: 'Entregues 10kg de chumbo, 5kg de plástico, 2kg de pilha e 1k de papel.',
		points: 120,
	},
	{
		date: new Date(),
		description: 'Entregues 10kg de chumbo, 5kg de plástico, 2kg de pilha e 1k de papel.',
		points: 120,
	},
	{
		date: new Date(),
		description: 'Entregues 10kg de chumbo, 5kg de plástico, 2kg de pilha e 1k de papel.',
		points: 120,
	},
	{
		date: new Date(),
		description: 'Entregues 10kg de chumbo, 5kg de plástico, 2kg de pilha e 1k de papel.',
		points: 120,
	},
]

function Header() {
	return (
		<ProfileHeader>
			<UserStatus />
			<ProfileActions />
		</ProfileHeader>
	)
}

export function ProfileScreen() {
	return (
		<SafeAreaView style={styles.root}>
			<FlatList
				ListHeaderComponent={Header}
				showsVerticalScrollIndicator={false}
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
	},
	contentList: {
		backgroundColor: '#fff',
		flexGrow: 1,
	},
})
