import { View, Text, Modal, StyleSheet } from 'react-native'
import { PrimaryButton } from '../ui/Buttons'
import { COLORS } from '../../constants/colors'
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'

interface ConfirmDeliveryModalProps {
	visible: boolean
	onCancel: () => void
	onConfirm: () => void
}

export function ConfirmDeliveryModal(props: ConfirmDeliveryModalProps) {
	const [isLoading, setIsLoading] = useState(false)
	return (
		<Modal visible={props.visible} transparent>
			<View style={styles.modalContainer}>
				<View style={styles.modalCardShadow}>
					<View style={styles.modalCard}>
						<View style={styles.modalMessageContainer}>
							<Ionicons name='information-circle' color={COLORS.primary500} size={52} />
							<Text style={styles.modalMessage}>O aluno está{'\n'}entregando:</Text>
						</View>
						<Text style={styles.modalMessage}>Confirmar Entrega?</Text>
						<View style={styles.modalButtonsContainer}>
							<PrimaryButton
								avoidClick={isLoading}
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
								isLoading={isLoading}
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
		width: 300,
		height: 210,
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
})
