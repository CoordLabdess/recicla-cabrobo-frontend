import { useIsFocused } from '@react-navigation/native'
import { useContext, useLayoutEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AwardHistoryListItem } from '../../components/awards/AwardHistoryListItem'
import { AwardWithDrawListItem } from '../../components/awards/AwardWithdrawListItem'
import { NoHistoryMessage } from '../../components/history/NoHistoryMessage'
import { SimplePageHeader } from '../../components/ui/SimplePageHeader'
import { AuthContext } from '../../store/context/authContext'
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
							Number(new Date(a.dataCriacaoResgate)) - Number(new Date(b.dataCriacaoResgate)),
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
				renderItem={itemData => (
					<AwardHistoryListItem
						last={itemData.index + 1 >= awardHistory.length}
						itemData={itemData}
					/>
				)}
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
