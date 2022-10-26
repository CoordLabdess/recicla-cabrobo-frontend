import { View, Text, StyleSheet, ListRenderItemInfo, YellowBox, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../constants/colors'
import { History as H } from '../../utils/student'
import { Entrega, MaterialOutput, SchoolAwardsWithdraw } from '../../utils/school'
import { materials } from '../../data/materialTable'
import { formatDate } from '../../utils/formatData'

interface DeliveryListItemProps {
	itemData: ListRenderItemInfo<Entrega>
	last: boolean
	materialsList: MaterialOutput[]
}

export function DeliveryListItem(props: DeliveryListItemProps) {
	return (
		<Pressable style={styles.root} android_ripple={{ color: '#ccc' }}>
			<View style={styles.historyElement}>
				<View style={{ alignItems: 'center', marginRight: 10 }}>
					<View
						style={{
							backgroundColor: COLORS.secondary100,
							borderRadius: 100,
							padding: 4,
							borderWidth: 4,
							borderColor: COLORS.primary500,
						}}
					/>
					{!props.last ? (
						<View style={{ backgroundColor: COLORS.primary500, width: 3, flex: 1, marginTop: 5 }} />
					) : (
						<View style={{ width: 3, flex: 1 }} />
					)}
				</View>
				<View style={{ width: '100%' }}>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
						<Text style={styles.historyDateText}>{formatDate(props.itemData.item.created_at)}</Text>
						<Text style={{ color: '#7C7C7C', fontSize: 10, marginTop: 6 }}>
							Clique Para Visualizar
						</Text>
					</View>
					<View>
						<Text style={styles.historyDescriptionText}>{`${
							props.itemData.item.aluno.nome
						} entregou ${props.itemData.item.pesagemEntrega}kg de ${
							props.materialsList.filter(m => m.id === props.itemData.item.idMaterial)[0]
								.nomeMaterial
						} `}</Text>

						<Text style={styles.historyPointsText}>
							+{Number(props.itemData.item.pontosEntrega).toFixed(1)}pts
						</Text>
					</View>
				</View>
			</View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		alignItems: 'center',
		paddingVertical: 5,
	},
	historyElement: {
		width: '80%',

		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
	},
	historyDateText: {
		fontSize: 16,
		fontWeight: '500',
		marginBottom: 10,
	},
	historyDescriptionText: {
		fontSize: 14,
		color: '#7C7C7C',
		marginBottom: 5,
	},
	historyPointsText: {
		fontSize: 16,
		color: '#7C7C7C',
		marginBottom: 20,
	},
})
