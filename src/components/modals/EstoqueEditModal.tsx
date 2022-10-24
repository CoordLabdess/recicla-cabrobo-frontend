import { useState } from 'react'
import { View, Text, StyleSheet, Modal, ScrollView, Pressable, Linking } from 'react-native'
import { COLORS } from '../../constants/colors'
import { CustomButton, PrimaryButton } from '../ui/Buttons'
import { Ionicons } from '@expo/vector-icons'
import { PrimaryTextInput } from '../ui/TextInputs'
import { Award } from '../../utils/student'

interface PrivacPolicyModalProps {
	premio: Award
	visible: boolean
	isLoading: boolean
	onSave: (a: number) => void
	onCancel: () => void
}

export function EstoqueEditModal(props: PrivacPolicyModalProps) {
	const [ammount, setAmmount] = useState('0')

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
							<View
								style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}
							>
								<View style={{ borderRadius: 200, overflow: 'hidden', opacity: 0 }}>
									<Pressable style={{ alignItems: 'center', justifyContent: 'center' }}>
										<Ionicons name='close' size={30} />
									</Pressable>
								</View>
								<Text style={styles.title}>Adicionar Estoque</Text>
								<View
									style={{
										borderRadius: 200,
									}}
								>
									<Pressable
										onPress={props.onCancel}
										style={{ alignItems: 'center', justifyContent: 'center' }}
										android_ripple={{ color: COLORS.secondary400 }}
									>
										<Ionicons name='close' size={30} />
									</Pressable>
								</View>
							</View>
							<Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 10 }}>
								{props.premio.nome}
							</Text>
							<PrimaryTextInput
								keyboardType='number-pad'
								onChangeText={text => setAmmount(text)}
								value={String(ammount)}
								style={{ fontSize: 30, marginBottom: 20, width: 100, textAlign: 'center' }}
								placeholder='0'
							/>
							<View style={{ flexDirection: 'row' }}>
								<PrimaryButton
									isLoading={props.isLoading}
									textStyle={{ fontSize: 18 }}
									title='Adicionar'
									onPress={() => props.onSave(Number(ammount))}
									outterContainerStyle={{ width: 140 }}
									marginRight={5}
								/>
								<PrimaryButton
									isLoading={props.isLoading}
									textStyle={{ fontSize: 18 }}
									title='Remover'
									innerContainerStyle={{ backgroundColor: COLORS.error }}
									onPress={() => props.onSave(Number(-ammount))}
									outterContainerStyle={{ width: 140 }}
									marginLeft={5}
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
		paddingBottom: 10,
		width: 350,

		backgroundColor: '#fff',
		overflow: 'hidden',

		borderRadius: 16,
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
