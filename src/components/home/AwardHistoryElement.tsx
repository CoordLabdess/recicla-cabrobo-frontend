import { View, Text, StyleSheet, ListRenderItemInfo, YellowBox, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../constants/colors'
import { Award, AwardHistory } from '../../utils/student'
import { formatDate } from '../../utils/formatData'

export function AwardHistoryElement(props: {
	itemData: ListRenderItemInfo<AwardHistory>
	last: boolean
	onPress?: (award: AwardHistory) => void
}) {
	return (
		<Pressable
			style={styles.root}
			android_ripple={{ color: '#ccc' }}
			onPress={() => props.onPress && props.onPress(props.itemData.item)}
		>
			<View style={styles.historyElement}>
				<View style={{ alignItems: 'center', marginRight: 10 }}>
					<View
						style={{
							backgroundColor: COLORS.secondary100,
							borderRadius: 100,
							padding: 4,
							borderWidth: 4,
							borderColor: props.itemData.item.status === 0 ? '#FFB727' : COLORS.primary500,
						}}
					/>
					{!props.last ? (
						<View
							style={{
								backgroundColor: props.itemData.item.status === 0 ? '#FFB727' : COLORS.primary500,
								width: 3,
								flex: 1,
								marginTop: 5,
							}}
						/>
					) : (
						<View style={{ width: 3, flex: 1 }} />
					)}
				</View>
				<View style={{ flex: 1 }}>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
						}}
					>
						<Text style={styles.historyDateText}>
							{formatDate(props.itemData.item.created_at || '')}
						</Text>
						<Text style={{ color: '#7C7C7C', fontSize: 10, marginTop: 6 }}>
							Clique Para Visualizar
						</Text>
					</View>
					<View>
						<Text style={styles.historyDescriptionText}>{`Você ${
							props.itemData.item.status === 1 ? 'resgatou' : 'solicitou'
						} ${props.itemData.item.premio.nome}`}</Text>
						<Text style={styles.historyPointsText}>
							-{Number(props.itemData.item.premio.preco).toFixed(1)}pts
						</Text>
						<Text
							style={[
								styles.historyPointsText,
								{ color: props.itemData.item.status === 1 ? 'green' : '#FFB727' },
							]}
						>
							{props.itemData.item.status === 1 ? 'Confirmado' : 'Não Confirmado'}
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
		width: '85%',
		alignItems: 'center',
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
