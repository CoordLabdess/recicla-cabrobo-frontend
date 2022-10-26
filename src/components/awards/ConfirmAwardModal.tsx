import { Modal, View, Text, StyleSheet } from 'react-native'
import { Award } from '../../data/awards'
import { Student } from '../../data/students'
import { PrimaryButton } from '../ui/Buttons'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../constants/colors'
import { RouteProp } from '@react-navigation/native'
import { StudentData } from '../../utils/student'

interface ConfirmAwardModalProps {
	visible: boolean
	isLoading?: boolean
	onCancel: () => void
	onConfirm: (premioId: string) => void
	award: Award
	student: StudentData
}

export function ConfirmAwardModal(props: ConfirmAwardModalProps) {
	return (
		<Modal transparent visible={props.visible}>
			<View style={styles.modalContainer}>
				<View style={styles.modalCardShadow}>
					<View style={styles.modalCard}>
						<View style={styles.modalMessageContainer}>
							<Ionicons name='information-circle' color={COLORS.primary500} size={52} />
							<Text style={styles.modalMessage}>Você tem certeza?</Text>
						</View>
						<View style={{ width: 250 }}>
							<View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
								<Text style={styles.textDetailTitle}>Nome: </Text>
								<Text style={styles.textDetail}>{props.student.nome}</Text>
							</View>
							<View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
								<Text style={styles.textDetailTitle}>Matrícula: </Text>
								<Text style={styles.textDetail}>{props.student.matricula}</Text>
							</View>
							<View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
								<Text style={styles.textDetailTitle}>Série: </Text>
								<Text style={styles.textDetail}>5º ano</Text>
							</View>
							<View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
								<Text style={styles.textDetailTitle}>Prêmio: </Text>
								<Text style={styles.textDetail}>{props.award?.nome}</Text>
							</View>
							<View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
								<Text style={styles.textDetailTitle}>Descricão: </Text>
								<Text style={styles.textDetail}>{props.award?.especificacao}</Text>
							</View>
							<View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
								<Text style={styles.textDetailTitle}>Preço: </Text>
								<Text style={styles.textDetail}>{props.award?.preco} pts</Text>
							</View>
						</View>

						<View style={{ alignItems: 'center', width: 250, marginVertical: 20 }}>
							<Text style={{ fontWeight: '600', textAlign: 'center' }}>
								Ao continuar, será descontado o valor do prêmio da pontuação do aluno. Essa ação não
								pode ser desfeita.
							</Text>
						</View>
						<View style={styles.modalButtonsContainer}>
							<PrimaryButton
								avoidClick={props.isLoading}
								title='Não'
								marginRight={24}
								outterContainerStyle={{ borderWidth: 3, borderColor: COLORS.primary500 }}
								innerContainerStyle={{
									backgroundColor: '#fff',
									paddingVertical: 2,
									paddingHorizontal: 20,
								}}
								textStyle={{ color: COLORS.primary500 }}
								onPress={props.onCancel}
							/>
							<PrimaryButton
								title='Sim'
								avoidClick={false}
								isLoading={props.isLoading}
								marginLeft={24}
								innerContainerStyle={{
									paddingVertical: 5,
									paddingHorizontal: 23,
								}}
								onPress={() => props.onConfirm(props.award?.id)}
							/>
						</View>
					</View>
				</View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#00000070',
	},
	modalCardShadow: {
		borderRadius: 16,
		backgroundColor: 'transparent',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
	},
	modalCard: {
		backgroundColor: '#fff',
		overflow: 'hidden',
		borderRadius: 16,
		paddingHorizontal: 20,
		paddingTop: 6,
		paddingBottom: 25,
		alignItems: 'center',
		justifyContent: 'center',
	},
	modalMessageContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 20,
	},
	modalMessage: {
		color: COLORS.primary500,
		marginLeft: 20,
		fontSize: 25,
		textAlign: 'center',
		fontWeight: '600',
	},
	modalButtonsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	textDetailTitle: {
		color: '#000',
		fontWeight: '600',
	},
	textDetail: {
		color: COLORS.secondary500,
		fontWeight: '600',
		flex: 1,
	},
})
