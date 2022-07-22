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

interface Material {
	id: number
	title: string
	category: 'Plastic' | 'Paper' | 'Metal' | 'Glass'
	pointsPerKg: number
	icon: string
}

interface MaterialsWeight {
	garrafaPET: number
	plasticoPEAD: number
	plasticosDiversos: number
	polipropileno: number
	papelao: number
	sucataDePapel: number
	sucataDeFerro: number
	sucataDeCobre: number
	latinhaDeAluminio: number
	sucataDeAluminio: number
	acoInox: number
}

function renderHeader() {
	return <SimplePageHeader title='Informe o Peso dos Materiais' textStyle={styles.title} />
}

const initialMaterialsWeight = {
	garrafaPET: 0,
	plasticoPEAD: 0,
	plasticosDiversos: 0,
	polipropileno: 0,
	papelao: 0,
	sucataDePapel: 0,
	sucataDeFerro: 0,
	sucataDeCobre: 0,
	latinhaDeAluminio: 0,
	sucataDeAluminio: 0,
	acoInox: 0,
}

export function InformMaterialsScreen() {
	const [isLoading, setIsLoading] = useState(false)
	const [isModalActive, setIsModalActive] = useState(false)
	const [materialsWeight, setMaterialsWeight] = useState([
		'0',
		'0',
		'0',
		'0',
		'0',
		'0',
		'0',
		'0',
		'0',
		'0',
		'0',
	])

	function changeMaterialsWeight(index: number, value: string) {
		setMaterialsWeight(cWeight => {
			return [...cWeight.slice(0, index), value, ...cWeight.slice(index + 1)]
		})
	}

	async function sendMaterialsWeight() {
		setIsLoading(true)
		await new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve('')
			}, 1000)
		})
			.then(() => {
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
								materialWeight={materialsWeight[key]}
								setMaterialsWeight={(value: string) => {
									setMaterialsWeight(cWeight => {
										return [...cWeight.slice(0, key), value, ...cWeight.slice(key + 1)]
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
			<Modal visible={isModalActive} transparent>
				<View style={styles.modalContainer}>
					<View style={styles.modalCardShadow}>
						<View style={styles.modalCard}>
							<View style={styles.modalMessageContainer}>
								<Ionicons name='information-circle' color={COLORS.primary500} size={52} />
								<Text style={styles.modalMessage}>Confirmar{'\n'}Entrega?</Text>
							</View>
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
									onPress={() => {
										setIsModalActive(false)
									}}
								/>
								<PrimaryButton
									title='Sim'
									isLoading={isLoading}
									marginLeft={24}
									innerContainerStyle={{
										paddingVertical: 5,
										paddingHorizontal: 23,
									}}
									onPress={async () => {
										await sendMaterialsWeight()
											.then(() => {
												setIsModalActive(false)
											})
											.catch(err => {
												setIsModalActive(false)
											})
									}}
								/>
							</View>
						</View>
					</View>
				</View>
			</Modal>
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
