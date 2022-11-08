import { useIsFocused } from '@react-navigation/native'
import { useContext, useLayoutEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AwardHistoryListItem } from '../../components/awards/AwardHistoryListItem'
import { AwardWithDrawListItem } from '../../components/awards/AwardWithdrawListItem'
import { NoHistoryMessage } from '../../components/history/NoHistoryMessage'
import { SimplePageHeader } from '../../components/ui/SimplePageHeader'
import { AuthContext } from '../../store/context/authContext'
import { formatarDataStringToDate } from '../../utils/formatData'
import { HistoricoResgate, obterHistoricoDeResgates } from '../../utils/school'
import { LoadingScreen } from '../ui/LoadingScreen'

export function HistoricoResgateScreen() {
	const authCtx = useContext(AuthContext)
	const isFocused = useIsFocused()
	const [awardHistory, setAwardsHistory] = useState<HistoricoResgate[] | null>(null)

	useLayoutEffect(() => {
		obterHistoricoDeResgates(authCtx.token || '')
			.then(res => {
				setAwardsHistory(
					res.sort(
						(b, a) =>
							Number(formatarDataStringToDate(a.dataCriacaoResgate, 'dd-mm-yyyy', '/')) -
							Number(formatarDataStringToDate(b.dataCriacaoResgate, 'dd-mm-yyyy', '/')),
					),
				)
			})
			.catch(err => {
				console.log(err)
			})
	}, [isFocused])

	if (!awardHistory) {
		return <LoadingScreen />
	}

	return (
		<SafeAreaView style={styles.root} edges={['top', 'right', 'left']}>
			<FlatList
				ListHeaderComponent={() => <SimplePageHeader title='Histórico de Resgates' />}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ width: '100%' }}
				ListEmptyComponent={NoHistoryMessage}
				alwaysBounceVertical={false}
				data={awardHistory}
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
})
