import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, StyleSheet, Text, View, Pressable, FlatList } from 'react-native'
import { useContext, useLayoutEffect, useState } from 'react'
import { SchoolContext } from '../../store/context/schoolContext'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../constants/colors'
import { AuthContext } from '../../store/context/authContext'
import { EstoqueListItem } from '../../components/awards/EstoqueListItem'
import { Award } from '../../utils/student'
import { useIsFocused } from '@react-navigation/native'
import { atualizarEstoque, listarPremios } from '../../utils/school'
import { LoadingScreen } from '../ui/LoadingScreen'
import { EstoqueEditModal } from '../../components/modals/EstoqueEditModal'
import { SimplePageHeader } from '../../components/ui/SimplePageHeader'

export function GerenciarEstoqueScreen() {
	const authCtx = useContext(AuthContext)
	const adminCtx = useContext(SchoolContext)

	const [premios, setPremios] = useState<Award[] | null>(null)
	const [isLoading1, setIsLoading1] = useState(false)
	const [isLoading2, setIsLoading2] = useState(false)
	const [editModal, setEditModal] = useState<Award | null>(null)
	const [a, setA] = useState()
	const isFocused = useIsFocused()

	function updateAmmount(ammount: number) {
		if (!isLoading1 && !isLoading2 && editModal) {
			if (ammount >= 0) {
				setIsLoading1(true)
			} else {
				setIsLoading2(true)
			}
			atualizarEstoque(authCtx.token || '', editModal.id, ammount)
				.then(() => {
					setIsLoading1(false)
					setIsLoading2(false)
					setEditModal(null)
					atualizar()
				})
				.catch(() => {
					setIsLoading1(false)
					setIsLoading2(false)
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
					justifyContent: 'flex-start',
				}}
				alwaysBounceVertical={false}
				showsVerticalScrollIndicator={false}
				ListHeaderComponent={() => {
					return <SimplePageHeader title='Gerenciar Estoque' />
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
					isLoading1={isLoading1}
					isLoading2={isLoading2}
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
	adminHeader: {
		paddingHorizontal: '5%',
		flexDirection: 'row',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 10,
		borderBottomWidth: 1,
		borderColor: COLORS.secondary500,
		marginBottom: 20,
	},
	charge: {
		fontSize: 20,
		fontWeight: '600',
	},
	name: {
		fontSize: 20,
	},
})
