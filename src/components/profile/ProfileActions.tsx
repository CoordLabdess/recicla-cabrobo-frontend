import { View, Text, FlatList, StyleSheet, Pressable, ListRenderItemInfo } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../constants/colors'

interface Action {
	title: string
	icon: string
	screen: string
}

const actions: Action[] = [
	{
		title: 'Resgate De Prêmios',
		icon: 'gift',
		screen: '',
	},
	{
		title: 'Prêmios Resgatados',
		icon: 'arrow-down',
		screen: '',
	},
	{
		title: 'Pontuações Por Material',
		icon: 'trophy',
		screen: '',
	},
	{
		title: 'Calculadora de Impacto',
		icon: 'calculator',
		screen: '',
	},
	{
		title: 'Calculadora de Impacto',
		icon: 'calculator',
		screen: '',
	},
]

function ActionCard(props: { itemData: ListRenderItemInfo<Action> }) {
	return (
		<View style={styles.actionContainer}>
			<Pressable
				onPress={() => {
					console.log(props.itemData.item.title)
				}}
			>
				<View style={styles.actionIconContainer}>
					<Ionicons name={props.itemData.item.icon as any} size={42} color={COLORS.secondary100} />
				</View>
				<Text style={styles.actionTitleText}>{props.itemData.item.title}</Text>
			</Pressable>
		</View>
	)
}

export function ProfileActions() {
	return (
		<View style={styles.root}>
			<FlatList
				showsHorizontalScrollIndicator={false}
				data={actions}
				ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
				horizontal
				renderItem={itemData => {
					return <ActionCard itemData={itemData} />
				}}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	root: {
		alignItems: 'center',
		borderTopColor: '#c3c3c3',
		marginTop: 20,
		borderTopWidth: 1,
		paddingTop: 16,
		flex: 1,
	},
	actionContainer: {
		width: 84,
		alignItems: 'center',
	},
	actionIconContainer: {
		backgroundColor: COLORS.primary500,
		borderRadius: 100,
		alignSelf: 'center',
		padding: 11,
	},
	actionTitleText: {
		textAlign: 'center',
		fontSize: 12,
		marginTop: 7,
	},
})
