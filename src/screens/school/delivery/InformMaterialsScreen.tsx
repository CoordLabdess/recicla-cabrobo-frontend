import { useContext, useEffect, useState } from 'react'
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
import { criarEntrega } from '../../../utils/school'
import { AuthContext } from '../../../store/context/authContext'

interface InformMaterialScreenProps {
	route: RouteProp<{ params: { id: string; name: string; matricula: string } }, 'params'>
}

interface MaterialWeight {
	materialId: string
	weight: string
}

export function InformMaterialsScreen(props: InformMaterialScreenProps) {
	const { id, name, matricula } = props.route.params
	const [isLoading, setIsLoading] = useState(false)
	const [isModalActive, setIsModalActive] = useState(false)
	const [dataSent, setDataSent] = useState(false)

	const [materialsWeight, setMaterialsWeight] = useState<MaterialWeight[]>([
		{ materialId: '27552729-bedf-42ec-9254-6a3c4a6730df', weight: '0' },
		{ materialId: 'da5258a4-138d-4e4c-b32a-8ff02f049878', weight: '0' },
		{ materialId: 'f0d6a223-11a6-4d75-836d-2f596e61f63b', weight: '0' },
		{ materialId: '07ea2ebe-d40a-45a2-ae5d-cb6b172e4203', weight: '0' },
		{ materialId: '56968a7b-fb08-48f0-8010-607324d05685', weight: '0' },
		{ materialId: '6e9d4de0-ef49-4b40-8a00-768f5abd8323', weight: '0' },
		{ materialId: '8b311f78-4400-4f76-909a-259681f1dae0', weight: '0' },
		{ materialId: 'b346c87d-fcf4-48d8-a7cc-22a0a701f61c', weight: '0' },
		{ materialId: '4b2dd6c4-072b-4274-824b-1ceb43fdc813', weight: '0' },
		{ materialId: '74c16d5b-45c7-467b-8e5b-7e59def0e151', weight: '0' },
	])

	const [total, setTotal] = useState(0)

	const authCtx = useContext(AuthContext)
	async function sendMaterialsWeight() {
		if (!isLoading) {
			setIsLoading(true)
			await criarEntrega(
				authCtx.token as string,
				matricula,
				materialsWeight
					.filter(mw => Number(mw.weight) > 0)
					.map(mw => {
						return {
							idMaterial: mw.materialId,
							pesagemEntrega: Number(mw.weight),
						}
					}),
			)
				.then(res => {
					setTotal(res.pontosRecebidos)
					setDataSent(true)
					setIsModalActive(false)
					setIsLoading(false)
				})
				.catch(err => {
					setIsLoading(false)
					console.log('aaa')
				})
			// await new Promise((resolve, reject) => {
			// 	setTimeout(() => {
			// 		resolve('')
			// 	}, 1000)
			// })
			// 	.then(() => {
			// 		setDataSent(true)
			// 		setIsModalActive(false)
			// 		setIsLoading(false)
			// 	})
			// 	.catch(() => {
			// 		setIsLoading(false)
			// 	})
		}
	}

	return (
		<SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
			<ScrollView
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
								setMaterialsWeight={(materialId: string, weight: string) => {
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
				close={() => setDataSent(false)}
				visible={dataSent}
				categoriesPoints={{ metal: 0, paper: 0, plastic: 0, total: total }}
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
