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
	onCancel: () => void
	onConfirm: () => void
	addedMaterials: MaterialWeight[]
	isLoading: boolean
}

function getMaterialCategoryColor(category: MaterialCategory): string {
	return category === 'Plastic'
		? '#D63636'
		: category === 'Paper'
		? '#2367CC'
		: category === 'Metal'
		? '#F0C93E'
		: 'green'
}

function MaterialWeightElement(props: {
	name: string
	weight: string
	category: MaterialCategory
}) {
	return (
		<View
			style={[
				materialWeightStyles.container,
				{ backgroundColor: getMaterialCategoryColor(props.category) },
			]}
		>
			<Text style={materialWeightStyles.title}>{props.name}</Text>
			<Text style={materialWeightStyles.title}>{props.weight}kg</Text>
		</View>
	)
}

const materialWeightStyles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderRadius: 12,
		width: 300,
		height: 59,
		alignItems: 'center',
		backgroundColor: '#D63636',
		paddingHorizontal: 15,
		marginBottom: 15,
	},
	title: {
		color: COLORS.secondary100,
		fontSize: 22,
		fontWeight: '600',
	},
})

export function ConfirmDeliveryModal(props: ConfirmDeliveryModalProps) {
	function getMaterialsName(materialId: number) {
		return materials.filter(material => material.id === materialId)[0]
	}

	function renderElement(itemData: ListRenderItemInfo<MaterialWeight>) {
		const { title, category } = getMaterialsName(itemData.item.materialId)
		return (
			<MaterialWeightElement
				key={itemData.item.materialId}
				name={title}
				category={category}
				weight={itemData.item.weight}
			/>
		)
	}

	return (
		<Modal visible={props.visible} transparent>
			<View style={styles.modalContainer}>
				<View style={styles.modalCardShadow}>
					<View style={styles.modalCard}>
						<View style={styles.modalMessageContainer}>
							<Ionicons name='information-circle' color={COLORS.primary500} size={52} />
							<Text style={styles.modalMessage}>O aluno está{'\n'}entregando:</Text>
						</View>
						<View style={{ maxHeight: 300 }}>
							<FlatList
								style={{ flexGrow: 0, paddingHorizontal: 5 }}
								data={props.addedMaterials}
								alwaysBounceVertical={false}
								renderItem={itemData => renderElement(itemData)}
							/>
						</View>
						<Text style={styles.modalMessage}>Confirmar Entrega?</Text>
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
})
