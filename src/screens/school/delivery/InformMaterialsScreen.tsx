import { useContext, useEffect, useLayoutEffect, useState } from 'react'
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
import { MaterialCategory, materials } from '../../../data/materialTable'
import { Ionicons } from '@expo/vector-icons'
import { RouteProp, useNavigation } from '@react-navigation/native'
import { DeliveredModal } from '../../../components/delivery/DeliveredModal'
import { ConfirmDeliveryModal } from '../../../components/delivery/ConfirmDeliveryModal'
import { criarEntrega, listarMateriais, MaterialOutput } from '../../../utils/school'
import { AuthContext } from '../../../store/context/authContext'
import { LoadingScreen } from '../../ui/LoadingScreen'

interface InformMaterialScreenProps {
	route: RouteProp<{ params: { id: string; name: string; matricula: string } }, 'params'>
}

interface MaterialWeight {
	materialId: string
	nome: string
	pontosPorKg: number
	categoria: MaterialCategory
	weight: string
}

export function InformMaterialsScreen(props: InformMaterialScreenProps) {
	const { id, name, matricula } = props.route.params
	const [isLoading, setIsLoading] = useState(false)
	const [isModalActive, setIsModalActive] = useState(false)
	const [dataSent, setDataSent] = useState(false)
	const [materialsList, setMaterialsList] = useState<MaterialOutput[] | null>(null)

	const [materialsWeight, setMaterialsWeight] = useState<MaterialWeight[]>([])

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
		}
	}

	useLayoutEffect(() => {
		listarMateriais(authCtx.token || '').then(res => {
			setMaterialsList(res)
			setMaterialsWeight(
				res.map(m => {
					return {
						materialId: m.id,
						nome: m.nomeMaterial,
						pontosPorKg: m.pontosPorKg,
						categoria: m.categoria,
						weight: '0',
					}
				}),
			)
		})
	}, [])

	useEffect(() => {
		console.log(materialsWeight)
	}, [materialsWeight])

	if (!materialsList || materialsWeight.length < 1) {
		return <LoadingScreen />
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

				{materialsWeight.map((material, key) => {
					return (
						<View key={material.materialId} style={[styles.container]}>
							<AddMaterialComponent
								material={material}
								materialWeight={
									materialsWeight.filter(m => m.materialId === material.materialId)[0].weight
								}
								setMaterialsWeight={materialData => {
									setMaterialsWeight(cWeight => {
										const mIndex = cWeight.indexOf(
											materialsWeight.filter(
												material => material.materialId === materialData.materialId,
											)[0],
										)
										return [
											...cWeight.slice(0, mIndex),
											{ ...materialData },
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
