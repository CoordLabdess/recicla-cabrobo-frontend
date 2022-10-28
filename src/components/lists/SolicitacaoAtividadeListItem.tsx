import { Text, View, StyleSheet, Pressable } from 'react-native'
import { COLORS } from '../../constants/colors'
import { useNavigation } from '@react-navigation/native'

interface SolicitacaoAtividadeListItemProps {
	nomeAluno: string
	matriculaAluno: string
	nomeAtividade: string
	status: 'PENDENTE' | 'CONCLUIDO' | string
	pontosAtividade: number
}

export function SolicitacaoAtividadeListItem(props: SolicitacaoAtividadeListItemProps) {
	const navigation = useNavigation()
	return (
		<View style={styles.root}>
			<View style={styles.shadowContainer}>
				<View style={{ overflow: 'hidden', borderRadius: 27 }}>
					<Pressable
						style={styles.cardContainer}
						android_ripple={{ color: '#ccc' }}
						onPress={() => navigation.navigate('' as never)}
					>
						<View style={{ flex: 1.2 }}>
							<Text style={styles.nomeAluno}>Fulano da Silva Sauro</Text>
							<Text style={styles.matriculaAluno}>{props.matriculaAluno}</Text>
						</View>
						<View style={{ flex: 1.5 }}>
							<Text style={styles.nomeAtividade}>{props.nomeAtividade}</Text>
						</View>
						<View style={{ flex: 1 }}>
							<Text style={styles.points}>{props.pontosAtividade}</Text>
							<Text style={styles.status}>{props.status}</Text>
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
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: '#fff',
		paddingHorizontal: 9,
		paddingVertical: 4,
		minHeight: 110,
		borderRadius: 27,
		overflow: 'hidden',
	},
	profileImageContainer: {
		height: 80,
		width: 80,
		borderRadius: 100,
		overflow: 'hidden',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: COLORS.secondary400,
		marginRight: 10,
	},
	profileImage: {
		height: '100%',
		width: '100%',
	},
	profileInfoName: {
		fontSize: 14,
	},
	profileMinorInfo: {
		fontSize: 12,
		color: COLORS.secondary500,
	},
	nomeAluno: {
		fontWeight: '500',
		fontSize: 16,
	},
	matriculaAluno: {},
	nomeAtividade: {
		textAlign: 'center',
	},
	points: {
		fontSize: 20,
		textAlign: 'center',
		fontWeight: '500',
	},
	status: {
		textAlign: 'center',
	},
})
