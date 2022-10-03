import { FlatList, StyleSheet } from 'react-native'
import { useContext, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { History } from '../../../components/home/History'
import { SimplePageHeader } from '../../../components/ui/SimplePageHeader'
import { AuthContext } from '../../../store/context/authContext'
import { getSchoolAwardsWithdrawHistory, SchoolAwardsWithdraw } from '../../../utils/school'
import { LoadingScreen } from '../../ui/LoadingScreen'
import { AwardWithDrawListItem } from '../../../components/awards/AwardWithdrawListItem'

export function AwardsHistoryScreen() {
	const authCtx = useContext(AuthContext)
	const [awardsHistory, setAwardsHistory] = useState<SchoolAwardsWithdraw[] | null>(null)

	useLayoutEffect(() => {
		if (authCtx.token) {
			getSchoolAwardsWithdrawHistory(authCtx.token).then(res => {
				setAwardsHistory(
					res.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
				)
			})
		}
	}, [])

	if (!awardsHistory) {
		return <LoadingScreen />
	}

	return (
		<SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
			<FlatList
				ListHeaderComponent={() => <SimplePageHeader title='Histórico de Resgates' />}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ width: '100%' }}
				alwaysBounceVertical={false}
				data={awardsHistory}
				style={styles.contentList}
				renderItem={itemData => (
					<AwardWithDrawListItem
						last={itemData.index + 1 >= awardsHistory.length}
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
