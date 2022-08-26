import { useState } from 'react'
import { View, Text, StyleSheet, Modal, ScrollView, Pressable } from 'react-native'
import { COLORS } from '../../constants/colors'
import { PrimaryButton } from '../ui/Buttons'
import { Ionicons } from '@expo/vector-icons'
import { privacyPolicyText } from './privacyPolicyText'
import Checkbox from 'expo-checkbox'

interface PrivacPolicyModalProps {
	confirm: boolean
	visible: boolean
	onConfirm: () => void
	onCancel: () => void
}

export function PrivacyPolicyModal(props: PrivacPolicyModalProps) {
	const [checked, setChecked] = useState(false)
	return (
		<Modal visible={props.visible} transparent>
			<View style={styles.modalContainer}>
				<View style={styles.modalCardShadow}>
					<View style={styles.modalCard}>
						<ScrollView
							contentContainerStyle={{
								justifyContent: 'flex-start',
								padding: '5%',
								alignItems: 'center',
							}}
							alwaysBounceVertical={false}
							showsVerticalScrollIndicator={false}
						>
							<Text style={styles.title}>Política de Privacidade</Text>
							<View style={styles.textContainer}>
								<Text style={styles.privacyText}>{privacyPolicyText}</Text>
							</View>
							<Pressable onPress={() => setChecked(!checked)} style={styles.checkboxContainer}>
								<Checkbox
									style={styles.checkbox}
									value={checked}
									onValueChange={() => setChecked(!checked)}
								/>
								<Text style={styles.checkboxText}>Li e concordo com a Política de Privacidade</Text>
							</Pressable>

							<PrimaryButton avoidClick={!checked} title='Confirmar' onPress={props.onConfirm} />
						</ScrollView>
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
		maxWidth: '85%',
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
		maxHeight: '80%',
		justifyContent: 'flex-start',
		alignItems: 'center',
		paddingVertical: 10,
	},

	title: {
		fontSize: 25,
		color: COLORS.primary500,
		fontWeight: '600',
		marginBottom: 19,
	},
	textContainer: {
		borderWidth: 2,
		overflow: 'hidden',
		borderColor: COLORS.secondary500,
		padding: 14,
	},
	privacyText: {
		fontWeight: '500',
		fontSize: 12,
		fontStyle: 'italic',
	},
	checkboxContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: 15,
		padding: 10,
	},
	checkbox: {
		borderRadius: 4,
		borderColor: COLORS.secondary500,
		borderWidth: 3,
		height: 24,
		width: 24,
		marginRight: 5,
	},
	checkboxText: {
		fontSize: 12,
		fontWeight: '600',
		color: COLORS.secondary500,
	},
})
