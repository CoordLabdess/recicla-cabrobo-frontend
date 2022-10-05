import { View, Text, FlatList, Pressable, StyleSheet, ListRenderItemInfo } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SimplePageHeader } from '../../../components/ui/SimplePageHeader'
import { useState, useEffect, useLayoutEffect, useContext } from 'react'
import { COLORS } from '../../../constants/colors'
import { Ionicons } from '@expo/vector-icons'
import { useLinkProps } from '@react-navigation/native'
import { LoadingScreen } from '../../ui/LoadingScreen'
import { CalculadoraImapctoOutput, valoresCalculadoraImpactoAluno } from '../../../utils/student'
import { AuthContext } from '../../../store/context/authContext'

interface Economy {
	title: string
	alias: 'energy' | 'water' | 'gas' | 'space'
	value: number
}

const myActions: Economy[] = [
	{
		title: 'Energia',
		alias: 'energy',
		value: 1.28,
	},
	{
		title: 'Água',
		alias: 'water',
		value: 1,
	},
	{
		title: 'Gases do Efeito Estufa',
		alias: 'gas',
		value: 0.56,
	},
	{
		title: 'Espaço em Aterros',
		alias: 'space',
		value: 2.4,
	},
]

const allActions: Economy[] = [
	{
		title: 'Energia',
		alias: 'energy',
		value: 12.8,
	},
	{
		title: 'Água',
		alias: 'water',
		value: 10,
	},
	{
		title: 'Gases do Efeito Estufa',
		alias: 'gas',
		value: 5.6,
	},
	{
		title: 'Espaço em Aterros',
		alias: 'space',
		value: 24,
	},
]

function ImpactElement(props: { itemData: ListRenderItemInfo<Economy> }) {
	const iconName =
		props.itemData.item.alias === 'energy'
			? 'flash'
			: props.itemData.item.alias === 'gas'
			? 'thermometer'
			: props.itemData.item.alias === 'water'
			? 'water'
			: 'golf'
	const unit =
		props.itemData.item.alias === 'energy'
			? 'kWh'
			: props.itemData.item.alias === 'gas'
			? 'kg de CO2'
			: props.itemData.item.alias === 'water'
			? 'Litro(s)'
			: 'm³'
	const description =
		props.itemData.item.alias === 'energy'
			? `Isso corresponde a ${((26 / 1.28) * props.itemData.item.value).toFixed(
					0,
			  )} minuto(s) de consumo de uma TV LED ligada.`
			: props.itemData.item.alias === 'gas'
			? `Isso corresponde a um carro ligado em marcha lenta por ${(
					(12 / 0.56) *
					props.itemData.item.value
			  ).toFixed(0)} minuto(s).`
			: props.itemData.item.alias === 'water'
			? `Isso corresponde a ${((2 / 1) * props.itemData.item.value).toFixed(
					0,
			  )} unidade(s) pequena(s) de água mineral de 500ml.`
			: `Isso corresponde ao espaço que ${((2 / 2.4) * props.itemData.item.value).toFixed(
					0,
			  )} unidade(s) de papel higiênico ocupam num aterro.`

	return (
		<View style={styles2.impactContainer}>
			<View style={styles2.impactHeader}>
				<Ionicons name={iconName} size={52} />
				<Text style={styles2.impactTitle}>{props.itemData.item.title}</Text>
			</View>
			<View style={styles2.impactValueContainer}>
				<Text style={styles2.impactValueText}>Economia total de:</Text>
				<Text style={styles2.impactValueText}>
					{props.itemData.item.value + ' '}
					{unit}
				</Text>
			</View>
			<Text>{description}</Text>
		</View>
	)
}
function ImpactElementSeparator() {
	return <View style={{ flex: 1, borderBottomWidth: 1, borderBottomColor: COLORS.secondary500 }} />
}

export function ImpactCalculator() {
	const authCtx = useContext(AuthContext)
	const [economia, setEconomia] = useState<CalculadoraImapctoOutput | null>(null)
	const [action, setAction] = useState<0 | 1>(0)

	function ImpactCalculatorHeader() {
		return (
			<View style={{ flex: 1 }}>
				<SimplePageHeader
					title='Calculadora de Impacto'
					style={{ marginTop: 20, marginBottom: 10 }}
				/>

				<View style={styles.switcher}>
					<Pressable
						style={[styles.switch, action === 0 && styles.activeSwitch]}
						onPress={() => changeActionScope(0)}
					>
						<Ionicons name='person-outline' color='#000' size={20} style={{ marginRight: 10 }} />
						<Text>Minhas Ações</Text>
					</Pressable>
					<Pressable
						style={[styles.switch, action === 1 && styles.activeSwitch]}
						onPress={() => changeActionScope(1)}
					>
						<Ionicons name='list-outline' color='#000' size={20} style={{ marginRight: 10 }} />
						<Text>Dados Gerais</Text>
					</Pressable>
				</View>
			</View>
		)
	}

	function changeActionScope(id: 0 | 1) {
		if (action !== id) setAction(id)
	}

	useLayoutEffect(() => {
		valoresCalculadoraImpactoAluno(authCtx.token || '').then(res => {
			setEconomia(res)
		})
	}, [])

	if (!economia) {
		return <LoadingScreen />
	}

	return (
		<SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
			<FlatList
				ItemSeparatorComponent={ImpactElementSeparator}
				showsVerticalScrollIndicator={false}
				alwaysBounceVertical={false}
				ListHeaderComponent={ImpactCalculatorHeader}
				data={action === 0 ? myActions : allActions}
				renderItem={itemData => <ImpactElement itemData={itemData} />}
			/>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'flex-start',
	},
	title: {
		fontSize: 24,
		textAlign: 'center',
	},
	switcher: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 46,
	},
	switch: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%',
		borderBottomColor: COLORS.secondary200,
		borderBottomWidth: 3,
	},
	activeSwitch: {
		borderBottomColor: COLORS.primary500,
	},
	indicator: {
		height: 2,
		width: '100%',
	},
	activeIndicator: {
		backgroundColor: COLORS.primary500,
	},
})

const styles2 = StyleSheet.create({
	impactContainer: {
		flex: 1,
		paddingHorizontal: 10,
		paddingVertical: 12,
	},
	impactHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 10,
	},
	impactTitle: {
		fontSize: 23,
		fontWeight: '500',
	},
	impactValueContainer: {
		flexDirection: 'row',
	},
	impactValueText: {
		fontWeight: '500',
		marginRight: 10,
	},
})
