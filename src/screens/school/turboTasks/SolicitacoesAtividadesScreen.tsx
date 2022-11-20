import { useIsFocused, useNavigation } from '@react-navigation/native'
import { Select } from 'native-base'
import { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NoHistoryMessage } from '../../../components/history/NoHistoryMessage'
import { SolicitacaoAtividadeListItem } from '../../../components/lists/SolicitacaoAtividadeListItem'
import { NotifyModal } from '../../../components/modals/NotifyModal'
import { ConfirmModal } from '../../../components/ui/ConfirmModal'
import { SimplePageHeader } from '../../../components/ui/SimplePageHeader'
import { COLORS } from '../../../constants/colors'
import { AuthContext } from '../../../store/context/authContext'
import {
	aceitarEntregaAtividade,
	listarSolicitacoesAtividades,
	SolicitacaoAtividadeOutput,
} from '../../../utils/school'
import { LoadingScreen } from '../../ui/LoadingScreen'

export function SolicitacoesAtividadesScreen() {
	const isFocused = useIsFocused()
	const navigation = useNavigation()
	const [solicitacoes, setSolicitacoes] = useState<SolicitacaoAtividadeOutput[] | null>(null)
	const [confirmAtividade, setConfirmAtividade] = useState<{
		atividadeId: string
		matricula: string
	} | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const [success, setSuccess] = useState(false)
	const [failure, setFailure] = useState(false)
	const [filtroSolicitacoes, setFiltroSolicitacoes] = useState(null)
	const authCtx = useContext(AuthContext)
	const [filtroSerie, setFiltroSerie] = useState('')
	const [filteredTasks, setFilteredTasks] = useState<SolicitacaoAtividadeOutput[]>([])

	useLayoutEffect(() => {
		listarSolicitacoesAtividades(authCtx.token || '').then(res => {
			setSolicitacoes(res.filter(x => x.status === 'PENDENTE'))
		})
	}, [])

	useEffect(() => {
		listarSolicitacoesAtividades(authCtx.token || '').then(res => {
			setSolicitacoes(res.filter(x => x.status === 'PENDENTE'))
		})
	}, [isFocused])

	useEffect(() => {
		if (solicitacoes) {
			setFilteredTasks(solicitacoes.filter(x => x.aluno.serie === filtroSerie))
		}
	}, [filtroSerie])

	async function confirmarAtividade() {
		if (!isLoading && confirmAtividade) {
			setIsLoading(true)
			await aceitarEntregaAtividade(
				authCtx.token || '',
				confirmAtividade.atividadeId,
				confirmAtividade.matricula,
			)
				.then(res => {
					setIsLoading(false)
					setConfirmAtividade(null)
					setSuccess(true)
				})
				.catch(err => {
					setIsLoading(false)
					setFailure(true)
					setConfirmAtividade(null)
				})
		}
	}

	function atualizarFiltro(text: string) {
		setFiltroSerie(text)
	}

	if (!solicitacoes) {
		return <LoadingScreen />
	}

	return (
		<>
			<SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
				<FlatList
					ListHeaderComponent={() => {
						return (
							<View style={{ marginBottom: 30 }}>
								<SimplePageHeader title='Atividades Entregues' />
								<View>
									<Text>Turma</Text>
									<View style={{ overflow: 'hidden', borderRadius: 15 }}>
										<Select
											fontWeight={600}
											fontSize={20}
											selectedValue={filtroSerie}
											onValueChange={value => atualizarFiltro(value)}
											backgroundColor={COLORS.secondary400}
											py={9}
											px={17}
											borderRadius={16}
											placeholder='Selecione uma turma'
										>
											<Select.Item label='4º ano' value='4º ano' />
											<Select.Item label='5º ano' value='5º ano' />
											<Select.Item label='6º ano' value='6º ano' />
											<Select.Item label='7º ano' value='7º ano' />
											<Select.Item label='8º ano' value='8º ano' />
											<Select.Item label='9º ano' value='9º ano' />
											<Select.Item label='Multisérie' value='Multiserie' />
										</Select>
									</View>
								</View>
							</View>
						)
					}}
					contentContainerStyle={{
						flexGrow: 1,
						justifyContent: 'flex-start',
						paddingHorizontal: '5%',
					}}
					alwaysBounceVertical={false}
					showsVerticalScrollIndicator={false}
					data={filteredTasks}
					ListEmptyComponent={() => <NoHistoryMessage msg='Ainda não há atividades' />}
					renderItem={itemData => {
						const { item } = itemData

						return (
							<SolicitacaoAtividadeListItem
								onPress={() => {
									setConfirmAtividade({
										atividadeId: item.id,
										matricula: item.aluno.matricula,
									})
								}}
								serie={item.aluno.serie}
								matriculaAluno={item.aluno.matricula}
								nomeAluno={item.aluno.nome}
								nomeAtividade={item.__atividade__.nome}
								pontosAtividade={item.__atividade__.pontos}
								status={item.status}
							/>
						)
					}}
				/>
			</SafeAreaView>
			<ConfirmModal
				title='Confirmar Entrega'
				isLoading={isLoading}
				text='Deseja confirmar a entrega da atividade? Ao confirmar, a pontuação será atribuida ao aluno.'
				onCancel={() => {
					setConfirmAtividade(null)
				}}
				onConfirm={() => {
					confirmarAtividade()
				}}
				visible={confirmAtividade ? true : false}
			/>
			<NotifyModal
				visible={success}
				buttonText='Continuar'
				onAccept={() => {
					setSuccess(false)
				}}
				buttonColor={COLORS.primary500}
				title='Sucesso!'
				text='Atividade confirmada com sucesso!'
			/>
			<NotifyModal
				visible={failure}
				buttonText='Continuar'
				onAccept={() => {
					setFailure(false)
				}}
				title='Erro!'
				buttonColor='#8E2941'
				text='Ocorreu um erro durante a confirmação da atividade! Tente novamente!'
			/>
		</>
	)
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: '#fff',
	},
	textInput: {
		backgroundColor: COLORS.secondary400,
		fontSize: 14,
		paddingVertical: 9,
		paddingHorizontal: 17,
		borderRadius: 16,
	},
})
