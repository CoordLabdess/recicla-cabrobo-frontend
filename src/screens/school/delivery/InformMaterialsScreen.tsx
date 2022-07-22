import { useEffect, useState } from 'react'
import {
	View,
	Text,
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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
	const [materialsWeight, setMaterialsWeight] = useState([
		'1',
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
		'10',
		'11',
	])

	const [a, setA] = useState(0)

	function changeMaterialsWeight(index: number, value: string) {
		setMaterialsWeight(cWeight => {
			return [...cWeight.slice(0, index), value, ...cWeight.slice(index + 1)]
		})
	}

	function renderMaterial(itemData: ListRenderItemInfo<Material>) {
		function setMaterialWeight(value: string) {
			changeMaterialsWeight(itemData.index, value)
		}
		console.log('oiee')
		return (
			<View style={[styles.container]}>
				<AddMaterialComponent
					material={itemData.item}
					materialWeight={materialsWeight[itemData.index]}
					setMaterialsWeight={setMaterialWeight}
				/>
			</View>
		)
	}
	return (
		<SafeAreaView style={styles.root}>
			<ScrollView
				keyboardShouldPersistTaps='always'
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
			{/*<FlatList
				keyboardShouldPersistTaps='always'
				ListHeaderComponent={renderHeader}
				data={materials}
				renderItem={itemData => renderMaterial(itemData)}
				style={{ flex: 1 }}
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: 'flex-start',
					paddingHorizontal: '5%',
					alignItems: 'center',
					paddingBottom: 40,
				}}
				alwaysBounceVertical={false}
				showsVerticalScrollIndicator={false}
			/>*/}
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
		fontSize: 22,
		color: COLORS.primary500,
		fontWeight: '600',
	},
	buttonContainer: {
		paddingTop: 10,
		marginBottom: 26,
		width: '100%',
		alignItems: 'center',
		borderTopColor: COLORS.secondary200,
		borderTopWidth: 1,
	},
})
