import { useEffect, useState } from 'react'
import {
	View,
	Text,
	Modal,
	StyleSheet,
	ScrollView,
	FlatList,
	ListRenderItemInfo,
	KeyboardAvoidingView,
	Platform,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AddMaterialComponent } from '../../../components/delivery/AddMaterialComponent'
import { PrimaryButton } from '../../../components/ui/Buttons'
import { SimplePageHeader } from '../../../components/ui/SimplePageHeader'
import { COLORS } from '../../../constants/colors'
import { materials } from '../../../data/materialTable'
import { Ionicons } from '@expo/vector-icons'
import { RouteProp, useNavigation } from '@react-navigation/native'
import { DeliveredModal } from '../../../components/delivery/DeliveredModal'
import { ConfirmDeliveryModal } from '../../../components/delivery/ConfirmDeliveryModal'

interface InformMaterialScreenProps {
	route: RouteProp<{ params: { id: string; name: string } }, 'params'>
}

interface MaterialWeight {
	materialId: number
	weight: string
}

export function InformMaterialsScreen(props: InformMaterialScreenProps) {
	const { id, name } = props.route.params
	const [isLoading, setIsLoading] = useState(false)
	const [isModalActive, setIsModalActive] = useState(false)
	const [dataSent, setDataSent] = useState(false)

	const [materialsWeight, setMaterialsWeight] = useState<MaterialWeight[]>([
		{ materialId: 1, weight: '0' },
		{ materialId: 2, weight: '0' },
		{ materialId: 3, weight: '0' },
		{ materialId: 4, weight: '0' },
		{ materialId: 5, weight: '0' },
		{ materialId: 6, weight: '0' },
		{ materialId: 7, weight: '0' },
		{ materialId: 8, weight: '0' },
		{ materialId: 9, weight: '0' },
		{ materialId: 10, weight: '0' },
		{ materialId: 11, weight: '0' },
	])

	async function sendMaterialsWeight() {
		setIsLoading(true)
		await new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve('')
			}, 1000)
		})
			.then(() => {
				setDataSent(true)
				setIsModalActive(false)
				setIsLoading(false)
			})
			.catch(() => {
				setIsLoading(false)
			})
	}

	return (
		<SafeAreaView style={styles.root}>
			<ScrollView
				keyboardShouldPersistTaps='always'
				showsVerticalScrollIndicator={false}
				style={{ flex: 1 }}
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: 'flex-start',
					paddingHorizontal: '5%',
					alignItems: 'center',
					paddingBottom: 40,
				}}
			>
				<SimplePageHeader title='Informe o Peso dos Materiais' textStyle={styles.title} />

				{materials.map((material, key) => {
					return (
						<View key={material.id} style={[styles.container]}>
							<AddMaterialComponent
								material={material}
								materialWeight={
									materialsWeight.filter(cMaterial => cMaterial.materialId === material.id)[0]
										.weight
								}
								setMaterialsWeight={(materialId: number, weight: string) => {
									setMaterialsWeight(cWeight => {
										const mIndex = cWeight.indexOf(
											materialsWeight.filter(material => material.materialId === materialId)[0],
										)
										return [
											...cWeight.slice(0, mIndex),
											{ materialId: materialId, weight: weight },
											...cWeight.slice(mIndex + 1),
										]
									})
								}}
							/>
						</View>
					)
				})}
			</ScrollView>
			<View style={styles.buttonContainer}>
				<PrimaryButton
					title='Continuar'
					isLoading={isLoading}
					onPress={() => setIsModalActive(true)}
				/>
			</View>
			<ConfirmDeliveryModal
				visible={isModalActive}
				addedMaterials={materialsWeight.filter(material => Number(material.weight) > 0)}
				isLoading={isLoading}
				onCancel={() => setIsModalActive(false)}
				onConfirm={() => sendMaterialsWeight()}
			/>
			<DeliveredModal
				id={id}
				name={name}
				visible={dataSent}
				categoriesPoints={{ metal: 34, paper: 11, plastic: 26, total: 71 }}
			/>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	root: {
		backgroundColor: '#fff',
		flex: 1,
	},
	container: {
		width: '100%',
		alignItems: 'center',
	},
	title: {
		fontSize: 20,
		color: COLORS.primary500,
		fontWeight: '600',
	},
	buttonContainer: {
		paddingTop: 15,
		marginBottom: 15,
		width: '100%',
		alignItems: 'center',
		borderTopColor: COLORS.secondary200,
		borderTopWidth: 1,
	},
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
