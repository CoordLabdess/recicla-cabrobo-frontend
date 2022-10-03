import { SafeAreaView } from 'react-native-safe-area-context'
import { useLayoutEffect, useContext, useState } from 'react'
import { ScrollView, View, Text, StyleSheet, Pressable, FlatList } from 'react-native'
import { COLORS } from '../../constants/colors'
import { SimplePageHeader } from '../../components/ui/SimplePageHeader'
import { atualizarEstoque, listarPremios } from '../../utils/school'
import { AuthContext } from '../../store/context/authContext'
import { LoadingScreen } from '../ui/LoadingScreen'
import { Award } from '../../utils/student'
import { EstoqueListItem } from '../../components/awards/EstoqueListItem'
import { EstoqueEditModal } from '../../components/modals/EstoqueEditModal'
import { useIsFocused } from '@react-navigation/native'

export function GerenciarEstoqueScreen() {
	const authCtx = useContext(AuthContext)
	const [premios, setPremios] = useState<Award[] | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const [editModal, setEditModal] = useState<Award | null>(null)
	const [a, setA] = useState()
	const isFocused = useIsFocused()

	function updateAmmount(ammount: number) {
		if (!isLoading && editModal) {
			setIsLoading(true)
			atualizarEstoque(authCtx.token || '', editModal.id, ammount)
				.then(() => {
					setIsLoading(false)
					setEditModal(null)
					atualizar()
				})
				.catch(() => {
					setIsLoading(false)
				})
		}
	}

	async function atualizar() {
		listarPremios(authCtx.token || '').then(res => {
			setPremios(res.sort((a, b) => (a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0)))
		})
	}

	useLayoutEffect(() => {
		atualizar()
	}, [isFocused])

	if (!premios) {
		return <LoadingScreen />
	}

	return (
		<SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
			<FlatList
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: 'flex-start',
					paddingHorizontal: '5%',
					alignItems: 'center',
				}}
				alwaysBounceVertical={false}
				showsVerticalScrollIndicator={false}
				ListHeaderComponent={() => {
					return <SimplePageHeader title='Gerenciar Estoques' dontShowGoBack />
				}}
				data={premios}
				renderItem={i => {
					return (
						<EstoqueListItem
							premio={i.item}
							onPress={p => {
								setEditModal(p)
							}}
						/>
					)
				}}
			/>
			{editModal && (
				<EstoqueEditModal
					isLoading={isLoading}
					visible={editModal ? true : false}
					premio={editModal}
					onCancel={() => setEditModal(null)}
					onSave={m => {
						updateAmmount(m)
					}}
				/>
			)}
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: '#fff',
	},
})
