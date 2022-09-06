import { useContext, useLayoutEffect, useState } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { DeliveryListItem } from '../../../components/awards/DeliveryListItem'
import { History } from '../../../components/home/History'
import { SimplePageHeader } from '../../../components/ui/SimplePageHeader'
import { AuthContext } from '../../../store/context/authContext'
import { Entrega, getSchoolDeliveryHistory } from '../../../utils/school'
import { LoadingScreen } from '../../ui/LoadingScreen'

interface History {
	date: Date
	description: string
	points: number
}

export function DeliveryHistoryScreen() {
	const [deliveryHistory, setDeliveryHistory] = useState<Entrega[] | null>(null)
	const authCtx = useContext(AuthContext)

	useLayoutEffect(() => {
		if (authCtx.token) {
			getSchoolDeliveryHistory(authCtx.token).then(res => {
				setDeliveryHistory(res)
			})
		}
	}, [])

	if (!deliveryHistory) {
		return <LoadingScreen />
	}

	return (
		<SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
			<FlatList
				ListHeaderComponent={() => <SimplePageHeader title='Histórico de Entregas' />}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ width: '100%' }}
				alwaysBounceVertical={false}
				data={deliveryHistory}
				style={styles.contentList}
				renderItem={itemData => (
					<DeliveryListItem
						last={itemData.index + 1 >= deliveryHistory.length}
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
