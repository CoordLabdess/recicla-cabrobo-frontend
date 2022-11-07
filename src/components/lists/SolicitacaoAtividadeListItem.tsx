import { Text, View, StyleSheet, Pressable } from 'react-native'
import { COLORS } from '../../constants/colors'
import { useNavigation } from '@react-navigation/native'

interface SolicitacaoAtividadeListItemProps {
	nomeAluno: string
	serie: string
	matriculaAluno: string
	nomeAtividade: string
	status: 'PENDENTE' | 'CONCLUIDO' | string
	pontosAtividade: number
	onPress: () => void
}

export function SolicitacaoAtividadeListItem(props: SolicitacaoAtividadeListItemProps) {
	const navigation = useNavigation()
	return (
		<View style={styles.root}>
			<View style={styles.shadowContainer}>
				<View style={{ overflow: 'hidden', borderRadius: 27 }}>
					<Pressable
						style={[styles.cardContainer]}
						android_ripple={{ color: '#ccc' }}
						onPress={props.onPress}
					>
						<View style={styles.field}>
							<Text style={styles.fieldLabel}>Atividade: </Text>
							<Text>{props.nomeAtividade}</Text>
						</View>
						<View style={styles.field}>
							<Text style={styles.fieldLabel}>Aluno: </Text>
							<Text>{props.nomeAluno}</Text>
						</View>
						<View style={styles.field}>
							<Text style={styles.fieldLabel}>Série: </Text>
							<Text>{props.serie}</Text>
						</View>
						<View style={styles.field}>
							<Text style={styles.fieldLabel}>Pontos: </Text>
							<Text>{props.pontosAtividade}</Text>
						</View>
						<View style={styles.field}>
							<Text style={styles.fieldLabel}>Status: </Text>
							<Text>{props.status}</Text>
						</View>
					</Pressable>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	root: {
		width: '100%',
		alignItems: 'center',
	},
	shadowContainer: {
		borderRadius: 27,
		backgroundColor: 'transparent',
		shadowColor: '#000',
		width: '90%',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
		marginBottom: 14,
	},
	cardContainer: {
		flexDirection: 'column',
		backgroundColor: '#fff',
		padding: 20,
		borderRadius: 27,
		overflow: 'hidden',
	},
	field: {
		flexDirection: 'row',
	},
	fieldLabel: {
		fontSize: 16,
		fontWeight: '500',
	},
})
