import { useIsFocused } from '@react-navigation/native'
import { useContext, useLayoutEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AwardHistoryListItem } from '../../components/awards/AwardHistoryListItem'
import { AwardWithDrawListItem } from '../../components/awards/AwardWithdrawListItem'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { NoHistoryMessage } from '../../components/history/NoHistoryMessage'
import { SimplePageHeader } from '../../components/ui/SimplePageHeader'
import { AuthContext } from '../../store/context/authContext'
import { formatarDataDateToString, formatarDataStringToDate } from '../../utils/formatData'
import {
	HistoricoEntrega,
	HistoricoResgate,
	ListarEscolaReturn,
	listarEscolas,
	listarMateriais,
	MaterialOutput,
	obterHistoricoDeEntregas,
	obterHistoricoDeResgates,
} from '../../utils/school'
import { LoadingScreen } from '../ui/LoadingScreen'
import { COLORS } from '../../constants/colors'
import { Select } from 'native-base'

interface filtro {
	dataInicial: Date
	dataFinal: Date
	loginEscola: string
	material: string
}

export function HistoricoEntregasScreen() {
	const authCtx = useContext(AuthContext)
	const isFocused = useIsFocused()
	const [awardHistory, setAwardsHistory] = useState<HistoricoEntrega[]>([])
	const [show1, setShow1] = useState(false)
	const [show2, setShow2] = useState(false)
	const [materiais, setMateriais] = useState<MaterialOutput[] | null>(null)
	const [escolas, setEscolas] = useState<ListarEscolaReturn[] | null>(null)
	const [filtro, setFiltro] = useState<filtro>({
		dataInicial: new Date(2022, 0, 1),
		dataFinal: new Date(),
		loginEscola: '',
		material: '',
	})
	const [isLoading, setIsLoading] = useState(false)

	useLayoutEffect(() => {
		if (!isLoading) {
			setIsLoading(true)
			listarEscolas(authCtx.token || '')
				.then(res => {
					setEscolas(res.sort((a, b) => (a.nome < b.nome ? -1 : b.nome > a.nome ? 1 : 0)))
				})
				.catch(err => {
					console.log(err)
				})
			listarMateriais(authCtx.token || '')
				.then(res => {
					setMateriais(
						res.sort((a, b) =>
							a.nomeMaterial < b.nomeMaterial ? -1 : b.nomeMaterial > a.nomeMaterial ? 1 : 0,
						),
					)
				})
				.catch(err => console.log(err))
			obterHistoricoDeEntregas(
				authCtx.token || '',
				filtro.dataInicial,
				filtro.dataFinal,
				filtro.loginEscola,
				filtro.material,
			)
				.then(res => {
					setAwardsHistory(
						res.sort(
							(b, a) =>
								Number(formatarDataStringToDate(a.dataEntrega, 'dd-mm-yyyy', '/')) -
								Number(formatarDataStringToDate(b.dataEntrega, 'dd-mm-yyyy', '/')),
						),
					)
					setIsLoading(false)
				})
				.catch(err => {
					console.log(err)
					setIsLoading(false)
				})
		}
	}, [isFocused, filtro])

	function onChangeDataInicial(event: DateTimePickerEvent, currentDate?: Date) {
		setShow1(false)

		if (currentDate && currentDate != filtro.dataInicial) {
			setFiltro({
				...filtro,
				dataInicial: currentDate,
			})
		}
	}

	function onChangeDataFinal(event: DateTimePickerEvent, currentDate?: Date) {
		setShow2(false)

		if (currentDate && currentDate != filtro.dataFinal) {
			setFiltro({
				...filtro,
				dataFinal: currentDate,
			})
		}
	}

	function onChangeEscola(value: string) {
		setFiltro({ ...filtro, loginEscola: value })
	}

	function onChangeMaterial(value: string) {
		setFiltro({ ...filtro, material: value })
	}

	if (!escolas || !materiais) {
		return <LoadingScreen />
	}

	return (
		<>
			<SafeAreaView style={styles.root} edges={['top', 'right', 'left']}>
				<FlatList
					ListHeaderComponent={() => {
						return (
							<View style={{ marginBottom: 30 }}>
								<SimplePageHeader title='Hist??rico de Entregas' />

								<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
									<View
										style={{
											marginRight: 20,
											borderRadius: 10,
											overflow: 'hidden',
											marginBottom: 20,
										}}
									>
										<Pressable
											android_ripple={{ color: '#c3c3c3' }}
											style={styles.dateContainer}
											onPress={() => setShow1(true)}
										>
											<Text style={styles.label}>De</Text>
											<Text style={styles.points}>
												{formatarDataDateToString(filtro.dataInicial, 'dd-mm-yyyy', '/')}
											</Text>
										</Pressable>
									</View>
									<View style={{ marginLeft: 20, borderRadius: 10, overflow: 'hidden' }}>
										<Pressable
											android_ripple={{ color: '#c3c3c3' }}
											style={styles.dateContainer}
											onPress={() => setShow2(true)}
										>
											<Text style={styles.label}>At??</Text>
											<Text style={styles.points}>
												{formatarDataDateToString(filtro.dataFinal, 'dd-mm-yyyy', '/')}
											</Text>
										</Pressable>
									</View>
								</View>
								<View style={{ width: '100%', alignItems: 'center', marginBottom: 20 }}>
									<View style={styles.elementContainer}>
										<View style={{ overflow: 'hidden', borderRadius: 15 }}>
											<Select
												selectedValue={filtro.loginEscola} placeholder="Selecione uma Escola"
												fontSize={20}
												fontWeight={600}
												onValueChange={onChangeEscola}
												bgColor={COLORS.secondary400}
												py={9}
												px={17}
												borderRadius={16}
											>
												{escolas.map(e => {
													return <Select.Item label={e.nome} value={e.idLogin} key={e.id} />
												})}
											</Select>
										</View>
									</View>
								</View>
								<View style={{ width: '100%', alignItems: 'center' }}>
									<View style={styles.elementContainer}>
										<View style={{ overflow: 'hidden', borderRadius: 15 }}>
											<Select
												selectedValue={filtro.material} placeholder="Selecione um material"
												fontSize={20}
												fontWeight={600}
												onValueChange={onChangeMaterial}
												bgColor={COLORS.secondary400}
												py={9}
												px={17}
												borderRadius={16}
											>
												{materiais.map(e => {
													return <Select.Item label={e.nomeMaterial} value={e.nomeMaterial} key={e.id} />
												})}
											</Select>
										</View>
									</View>
								</View>
							</View>
						)
					}}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ width: '100%' }}
					ListEmptyComponent={
						isLoading
							? LoadingScreen
							: () => <NoHistoryMessage msg='N??o houve entregas nesse per??odo' />
					}
					alwaysBounceVertical={false}
					data={isLoading ? [] : awardHistory}
					style={styles.contentList}
					renderItem={itemData => {
						const item = itemData.item
						return (
							<AwardHistoryListItem
								key={item.id}
								date={formatarDataStringToDate(item.dataEntrega, 'dd-mm-yyyy', '/')}
								aluno={item.aluno.nome}
								escola={item.escola.nome}
								material={item.material.nome}
								pontos={Number(item.pontosEntrega)}
								peso={item.pesagemEntrega}
								last={itemData.index + 1 >= awardHistory.length}
							/>
						)
					}}
				/>
			</SafeAreaView>
			{
				show1 && (
					<DateTimePicker
						value={filtro.dataInicial}
						onChange={onChangeDataInicial}
						minimumDate={new Date(2022, 0, 1)}
						maximumDate={filtro.dataFinal}
					/>
				)
			}
			{
				show2 && (
					<DateTimePicker
						value={filtro.dataFinal}
						onChange={onChangeDataFinal}
						accentColor={COLORS.primary500}
						minimumDate={filtro.dataInicial}
						maximumDate={new Date()}
					/>
				)
			}
		</>
	)
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: '#fff',
	},
	contentList: {
		backgroundColor: '#fff',
		flexGrow: 1,
	},
	elementContainer: {
		borderRadius: 10,
		width: 300,
	},

	points: {
		textAlign: 'center',
		fontSize: 24,
		color: '#fff',
		fontWeight: '500',
	},
	label: {
		fontSize: 20,
		color: '#fff',
		fontWeight: '500',
	},
	dateContainer: {
		borderRadius: 10,
		backgroundColor: COLORS.primary500,
		alignItems: 'center',
		paddingHorizontal: 10,
		paddingVertical: 2,
		minWidth: 150,
	},
	textInput: {
		backgroundColor: COLORS.secondary400,
		fontSize: 14,
		paddingVertical: 9,
		paddingHorizontal: 17,
		borderRadius: 16,
	},
})
