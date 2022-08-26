import { useState } from 'react'
import { View, Text, StyleSheet, Modal, ScrollView, Pressable, Linking } from 'react-native'
import { COLORS } from '../../constants/colors'
import { CustomButton, PrimaryButton } from '../ui/Buttons'
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
								paddingTop: '5%',
								alignItems: 'center',
								maxWidth: '100%',
								padding: 15,
							}}
							alwaysBounceVertical={false}
						>
							<Text style={styles.title}>Política de Privacidade</Text>
							<Text style={styles.description}>
								Leia nossa política de privacidade com atenção. Role para baixo, para visualizá-la
								completamente.
							</Text>
							<View style={styles.textContainer}>
								<Text style={styles.privacyText}>{privacyPolicyText}</Text>
							</View>
							{props.confirm && (
								<Pressable onPress={() => setChecked(!checked)} style={styles.checkboxContainer}>
									<Checkbox
										style={styles.checkbox}
										value={checked}
										onValueChange={() => setChecked(!checked)}
									/>
									<Text style={styles.checkboxText}>
										Li e concordo com a Política de Privacidade
									</Text>
								</Pressable>
							)}
							<View>
								<CustomButton
									style={{ marginBottom: 20 }}
									title='Ver política de privadidade'
									onPress={() => Linking.openURL('https://www.iubenda.com/privacy-policy/40648653')}
									textStyle={{ color: '#1a6dbb' }}
								/>
							</View>
							<View>
								<PrimaryButton
									avoidClick={!checked && props.confirm}
									title={props.confirm ? 'Confirmar' : 'Voltar'}
									onPress={props.onConfirm}
								/>
							</View>
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
		maxWidth: '90%',
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
	},

	title: {
		fontSize: 25,
		color: COLORS.primary500,
		fontWeight: '600',
		marginBottom: 19,
	},
	description: {
		fontSize: 14,
		fontWeight: '500',
		textAlign: 'center',
		color: COLORS.secondary500,
		marginBottom: 20,
	},
	textContainer: {
		borderWidth: 2,
		overflow: 'hidden',
		borderColor: COLORS.secondary500,
		padding: 14,
		marginBottom: 15,
	},
	privacyText: {
		fontWeight: '500',
		fontSize: 12,
		fontStyle: 'italic',
	},
	checkboxContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 15,
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
