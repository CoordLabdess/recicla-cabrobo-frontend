import { useContext, useLayoutEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SolicitacaoAtividadeListItem } from '../../../components/lists/SolicitacaoAtividadeListItem'
import { SimplePageHeader } from '../../../components/ui/SimplePageHeader'
import { AuthContext } from '../../../store/context/authContext'
import { listarSolicitacoesAtividades, SolicitacaoAtividadeOutput } from '../../../utils/school'
import { LoadingScreen } from '../../ui/LoadingScreen'

export function SolicitacoesAtividadesScreen() {
	const [solicitacoes, setSolicitacoes] = useState<SolicitacaoAtividadeOutput[] | null>(null)
	const [filtroSolicitacoes, setFiltroSolicitacoes] = useState(null)
	const authCtx = useContext(AuthContext)

	useLayoutEffect(() => {
		listarSolicitacoesAtividades(authCtx.token || '').then(res => {
			setSolicitacoes(res)
		})
	}, [])

	if (!solicitacoes) {
		return <LoadingScreen />
	}

	return (
		<SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
			<FlatList
				ListHeaderComponent={() => <SimplePageHeader title='Atividades Entregues' />}
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: 'flex-start',
					paddingHorizontal: '5%',
				}}
				alwaysBounceVertical={false}
				showsVerticalScrollIndicator={false}
				data={solicitacoes}
				renderItem={itemData => {
					const { item } = itemData
					return (
						<SolicitacaoAtividadeListItem
							matriculaAluno={item.matricula}
							nomeAluno={'Sem Nome'}
							nomeAtividade={item.__atividade__.nome}
							pontosAtividade={item.__atividade__.pontos}
							status={item.status}
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
})
