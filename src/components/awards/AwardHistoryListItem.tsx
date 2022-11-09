import { View, Text, StyleSheet, ListRenderItemInfo, YellowBox, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../constants/colors'
import { History as H } from '../../utils/student'
import { HistoricoResgate, SchoolAwardsWithdraw } from '../../utils/school'
import { formatarDataDateToString, formatDate } from '../../utils/formatData'

export function AwardHistoryListItem(props: {
	date: Date
	aluno?: string
	escola?: string
	premio?: string
	message?: string
	status?: string
	material?: string
	peso?: string
	last: boolean
	preco?: number
	pontos?: number
}) {
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
						<Text style={styles.historyDateText}>
							{formatarDataDateToString(props.date, 'dd-mm-yyyy', '/')}
						</Text>
						<Text style={{ color: '#7C7C7C', fontSize: 10, marginTop: 6 }}>
							Clique Para Visualizar
						</Text>
					</View>
					<View>
						{props.aluno && (
							<Text style={styles.historyDescriptionText}>{`Aluno: ${props.aluno}`}</Text>
						)}

						{props.escola && (
							<Text style={styles.historyDescriptionText}>{`Escola: ${props.escola}`}</Text>
						)}

						{props.premio && (
							<Text style={styles.historyDescriptionText}>{`Prêmio :${props.premio}`}</Text>
						)}
						{props.material && (
							<Text style={styles.historyDescriptionText}>{`Material :${props.material}`}</Text>
						)}
						{props.peso && (
							<Text style={styles.historyDescriptionText}>{`Peso :${props.peso} Kg`}</Text>
						)}
						<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
							{props.preco && (
								<Text style={styles.historyPointsText}>-{Number(props.preco).toFixed(1)}pts</Text>
							)}
							{props.pontos && (
								<Text style={styles.historyPointsText}>+{Number(props.pontos).toFixed(1)}pts</Text>
							)}
							<View />
							{props.status && <Text style={styles.historyPointsText}>{props.status}</Text>}
						</View>
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
