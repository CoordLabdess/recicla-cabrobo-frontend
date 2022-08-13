import { View, Text, FlatList, StyleSheet, Pressable, ListRenderItemInfo } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../constants/colors'
import { useNavigation } from '@react-navigation/native'

interface Action {
	title: string
	icon: string
	screen: string
}

const actions: Action[] = [
	{
		title: 'Prêmios Disponíveis',
		icon: 'gift',
		screen: '',
	},
	{
		title: 'Pontuação Turbinada',
		icon: 'rocket',
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
		screen: 'ImpactCalculator',
	},
]

function ActionCard(props: { itemData: ListRenderItemInfo<Action> }) {
	const navigation = useNavigation()
	return (
		<View style={styles.actionContainer}>
			<Pressable
				onPress={() => {
					navigation.navigate(props.itemData.item.screen as never)
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
				alwaysBounceHorizontal={false}
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
		borderTopWidth: 1,
		paddingTop: 16,
		flex: 1,
		marginBottom: 30,
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
