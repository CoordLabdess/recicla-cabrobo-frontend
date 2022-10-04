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

export function InicioScreen() {
	const authCtx = useContext(AuthContext)
	const adminCtx = useContext(SchoolContext)

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
					justifyContent: 'flex-start',
				}}
				alwaysBounceVertical={false}
				showsVerticalScrollIndicator={false}
				ListHeaderComponent={() => {
					return (
						<View style={styles.adminHeader}>
							<View>
								<Text style={styles.charge}>{`Adminstrador(a)`}</Text>
								<Text style={styles.name}>{adminCtx.schoolData.nomeGestor}</Text>
							</View>
							<Pressable onPress={authCtx.logout}>
								<Ionicons name='exit-outline' color={COLORS.primary500} size={40} />
							</Pressable>
						</View>
					)
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
