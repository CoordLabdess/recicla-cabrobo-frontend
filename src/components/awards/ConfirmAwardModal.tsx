import { Modal, View, Text, StyleSheet } from 'react-native'
import { Award } from '../../data/awards'
import { Student } from '../../data/students'
import { PrimaryButton } from '../ui/Buttons'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../constants/colors'
import { RouteProp } from '@react-navigation/native'

interface ConfirmAwardModalProps {
	visible: boolean
	isLoading?: boolean
	onCancel: () => void
	onConfirm: () => void
	award: Award | null
	student: Student
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
						<View style={{ width: 200 }}>
							<Text style={styles.textDetail}>{props.student.nome}</Text>
							<Text style={styles.textDetail}>5º ano</Text>
							<Text style={styles.textDetail}></Text>
						</View>
						<View style={{ alignItems: 'center', width: 200, marginBottom: 20 }}>
							<Text style={{ fontWeight: '600', textAlign: 'center' }}>
								Ao continuar, essa ação não poderá ser revertida.
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
								onPress={props.onConfirm}
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
	textDetail: {
		color: COLORS.secondary500,
		fontWeight: '600',
	},
})
