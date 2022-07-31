import { View, Text, Modal, StyleSheet, FlatList, ListRenderItemInfo } from 'react-native'
import { PrimaryButton } from '../ui/Buttons'
import { COLORS } from '../../constants/colors'
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { materials } from '../../data/materialTable'
import { MaterialCategory } from '../../data/materialTable'

interface MaterialWeight {
	materialId: number
	weight: string
}

interface ConfirmDeliveryModalProps {
	visible: boolean
	title: string
	text: string
	isLoading?: boolean
	onCancel: () => void
	onConfirm: () => void
}

export function ConfirmModal(props: ConfirmDeliveryModalProps) {
	return (
		<Modal visible={props.visible} transparent>
			<View style={styles.modalContainer}>
				<View style={styles.modalCardShadow}>
					<View style={styles.modalCard}>
						<View style={styles.modalMessageContainer}>
							<Ionicons name='information-circle' color={COLORS.primary500} size={52} />
							<Text style={styles.modalMessage}>{props.title}</Text>
						</View>
						<View style={styles.textContainer}>
							<Text style={styles.text}>{props.text}</Text>
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
		paddingVertical: 30,
		alignItems: 'center',
		justifyContent: 'center',
	},
	modalMessageContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 5,
	},
	modalMessage: {
		color: COLORS.primary500,
		marginLeft: 10,
		fontSize: 25,
		textAlign: 'center',
		fontWeight: '600',
	},
	textContainer: {
		width: '80%',
		alignItems: 'center',
		marginBottom: 20,
	},
	text: {
		fontWeight: '600',
		fontSize: 16,
		textAlign: 'center',
	},
	modalButtonsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
})
