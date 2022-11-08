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
import { HistoricoResgate, obterHistoricoDeResgates } from '../../utils/school'
import { LoadingScreen } from '../ui/LoadingScreen'
import { COLORS } from '../../constants/colors'

interface filtroData {
	dataInicial: Date
	dataFinal: Date
}

export function HistoricoResgateScreen() {
	const authCtx = useContext(AuthContext)
	const isFocused = useIsFocused()
	const [awardHistory, setAwardsHistory] = useState<HistoricoResgate[]>([])
	const [show1, setShow1] = useState(false)
	const [show2, setShow2] = useState(false)
	const [filtroData, setFiltroData] = useState<filtroData>({
		dataInicial: new Date(2022, 0, 1),
		dataFinal: new Date(),
	})
	const [isLoading, setIsLoading] = useState(false)

	useLayoutEffect(() => {
		if (!isLoading) {
			setIsLoading(true)
			obterHistoricoDeResgates(
				authCtx.token || '',
				filtroData.dataInicial,
				filtroData.dataFinal,
				'',
			)
				.then(res => {
					setAwardsHistory(
						res.sort(
							(b, a) =>
								Number(formatarDataStringToDate(a.dataCriacaoResgate, 'dd-mm-yyyy', '/')) -
								Number(formatarDataStringToDate(b.dataCriacaoResgate, 'dd-mm-yyyy', '/')),
						),
					)
					setIsLoading(false)
				})
				.catch(err => {
					console.log(err)
					setIsLoading(false)
				})
		}
	}, [isFocused, filtroData])

	function onChangeDataInicial(event: DateTimePickerEvent, currentDate?: Date) {
		setShow1(false)

		if (currentDate) {
			setFiltroData({
				...filtroData,
				dataInicial: currentDate,
			})
		}
	}

	function onChangeDataFinal(event: DateTimePickerEvent, currentDate?: Date) {
		setShow2(false)

		if (currentDate) {
			setFiltroData({
				...filtroData,
				dataFinal: currentDate,
			})
		}
	}

	return (
		<>
			<SafeAreaView style={styles.root} edges={['top', 'right', 'left']}>
				<FlatList
					ListHeaderComponent={() => {
						return (
							<View style={{ marginBottom: 30 }}>
								<SimplePageHeader title='Histórico de Resgates' />

								<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
									<View style={{ marginRight: 20, borderRadius: 10, overflow: 'hidden' }}>
										<Pressable
											android_ripple={{ color: '#c3c3c3' }}
											style={styles.dateContainer}
											onPress={() => setShow1(true)}
										>
											<Text style={styles.label}>De</Text>
											<Text style={styles.points}>
												{formatarDataDateToString(filtroData.dataInicial, 'dd-mm-yyyy', '/')}
											</Text>
										</Pressable>
									</View>
									<View style={{ marginLeft: 20, borderRadius: 10, overflow: 'hidden' }}>
										<Pressable
											android_ripple={{ color: '#c3c3c3' }}
											style={styles.dateContainer}
											onPress={() => setShow2(true)}
										>
											<Text style={styles.label}>Até</Text>
											<Text style={styles.points}>
												{formatarDataDateToString(filtroData.dataFinal, 'dd-mm-yyyy', '/')}
											</Text>
										</Pressable>
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
							: () => <NoHistoryMessage msg='Não houve resgates nesse período' />
					}
					alwaysBounceVertical={false}
					data={isLoading ? [] : awardHistory}
					style={styles.contentList}
					renderItem={itemData => {
						const item = itemData.item
						return (
							<AwardHistoryListItem
								date={formatarDataStringToDate(item.dataCriacaoResgate, 'dd-mm-yyyy', '/')}
								aluno={item.aluno.nome}
								premio={item.premio.nome}
								escola={item.escola.nome}
								status={item.statusEntrega}
								preco={item.premio.preco}
								last={itemData.index + 1 >= awardHistory.length}
							/>
						)
					}}
				/>
			</SafeAreaView>
			{show1 && (
				<DateTimePicker
					value={filtroData.dataInicial}
					onChange={onChangeDataInicial}
					minimumDate={new Date(2022, 0, 1)}
					maximumDate={filtroData.dataFinal}
				/>
			)}
			{show2 && (
				<DateTimePicker
					value={filtroData.dataFinal}
					onChange={onChangeDataFinal}
					accentColor={COLORS.primary500}
					minimumDate={filtroData.dataInicial}
					maximumDate={new Date()}
				/>
			)}
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
	elementContainer: {},

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
})
