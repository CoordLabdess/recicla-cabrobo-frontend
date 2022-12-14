import { useContext, useLayoutEffect, useState } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { DeliveryListItem } from '../../../components/awards/DeliveryListItem'
import { NoHistoryMessage } from '../../../components/history/NoHistoryMessage'
import { History } from '../../../components/home/History'
import { SimplePageHeader } from '../../../components/ui/SimplePageHeader'
import { AuthContext } from '../../../store/context/authContext'
import {
	Entrega,
	getSchoolDeliveryHistory,
	listarMateriais,
	MaterialOutput,
} from '../../../utils/school'
import { LoadingScreen } from '../../ui/LoadingScreen'

export function DeliveryHistoryScreen() {
	const [deliveryHistory, setDeliveryHistory] = useState<Entrega[] | null>(null)
	const authCtx = useContext(AuthContext)
	const [listaMateriais, setListaMateriais] = useState<MaterialOutput[] | null>(null)

	useLayoutEffect(() => {
		if (authCtx.token) {
			getSchoolDeliveryHistory(authCtx.token).then(res => {
				console.log(res)
				setDeliveryHistory(
					res.sort((b, a) => Number(new Date(a.created_at)) - Number(new Date(b.created_at))),
				)
			})
			listarMateriais(authCtx.token).then(res => {
				setListaMateriais(res)
			})
		}
	}, [])

	if (!deliveryHistory || !listaMateriais) {
		return <LoadingScreen />
	}

	return (
		<SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
			<FlatList
				ListHeaderComponent={() => <SimplePageHeader title='Histórico de Entregas' />}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ width: '100%' }}
				ListEmptyComponent={NoHistoryMessage}
				alwaysBounceVertical={false}
				data={deliveryHistory}
				style={styles.contentList}
				renderItem={itemData => (
					<DeliveryListItem
						materialsList={listaMateriais}
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
