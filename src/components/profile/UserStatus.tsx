import { View, Text, FlatList, ListRenderItemInfo, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface StatusItem {
	title: string
	icon: string
	value: number
	unit: string
}

const data: StatusItem[] = [
	{
		title: 'Pontos Disponíveis',
		icon: 'leaf-outline',
		value: 1000,
		unit: 'pts',
	},
	{
		title: 'Sua classificação',
		icon: 'medal-outline',
		value: 1000,
		unit: 'º Lugar',
	},
	{
		title: 'Peso Total Entregue',
		icon: 'trash-outline',

		value: 0,
		unit: 'kg',
	},
]

function StatusCard(props: { itemData: ListRenderItemInfo<StatusItem> }) {
	return (
		<View style={styles.statusContainer}>
			<View style={styles.statusIconContainer}>
				<Ionicons name={props.itemData.item.icon as any} color='#000' size={34} />
			</View>
			<View style={styles.statusInfoContainer}>
				<Text style={styles.statusTitleText}>{props.itemData.item.title}</Text>
				<Text style={styles.statusValueText}>
					{props.itemData.item.value}
					{props.itemData.item.unit}
				</Text>
			</View>
		</View>
	)
}

export function UserStatus() {
	return (
		<View style={styles.root}>
			<FlatList
				showsHorizontalScrollIndicator={false}
				data={data}
				ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
				horizontal
				renderItem={itemData => {
					return <StatusCard itemData={itemData} />
				}}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	root: {
		alignItems: 'center',
	},
	statusContainer: {
		flexDirection: 'row',
		marginTop: 25,
		alignItems: 'center',
	},
	statusIconContainer: {
		marginRight: 7,
	},
	statusInfoContainer: {},
	statusTitleText: {
		fontWeight: '400',
		color: '#7C7C7C',
	},
	statusValueText: {
		fontSize: 17,
		fontWeight: '400',
	},
})
