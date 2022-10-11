import { Picker } from '@react-native-picker/picker'
import { useContext, useLayoutEffect, useState } from 'react'
import { Text, View, ScrollView, StyleSheet, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PrimaryButton } from '../../../components/ui/Buttons'
import { ConfirmModal } from '../../../components/ui/ConfirmModal'
import { SimplePageHeader } from '../../../components/ui/SimplePageHeader'
import { COLORS } from '../../../constants/colors'
import { RouteProp, useNavigation } from '@react-navigation/native'
import { entregarAtividade, listarAtividades } from '../../../utils/school'
import { AuthContext } from '../../../store/context/authContext'
import { AtividadeDataOutput } from '../../../types/atividades.type'
import { LoadingScreen } from '../../ui/LoadingScreen'
import { NotifyModal } from '../../../components/modals/NotifyModal'

interface InformTurboTaskScreenProps {
	route: RouteProp<
		{
			params: {
				id: string
				name: string
				matricula: string
			}
		},
		'params'
	>
}

export function InformTurboTaskScreen(props: InformTurboTaskScreenProps) {
	const authCtx = useContext(AuthContext)
	const navigation = useNavigation()
	const [selectedTurboTask, setSelectedTurboTask] = useState<AtividadeDataOutput | null>(null)
	const [todasAtividades, setTodasAtividades] = useState<AtividadeDataOutput[] | null>(null)
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [success, setSuccess] = useState(false)
	const [failure, setFailure] = useState(false)

	async function sendChanges() {
		if (!isLoading) {
			setIsLoading(true)
			await entregarAtividade(
				authCtx.token || '',
				String(selectedTurboTask?.id) || '',
				props.route.params.matricula,
			)
				.then(response => {
					setIsLoading(false)
					setIsModalVisible(false)
					setSuccess(true)
				})
				.catch(error => {
					setIsLoading(false)
					setIsModalVisible(false)
					setFailure(true)
				})
		}
	}

	useLayoutEffect(() => {
		listarAtividades(authCtx.token || '').then(res => setTodasAtividades(res))
	}, [])

	if (!todasAtividades) {
		return <LoadingScreen />
	}

	return (
		<SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
			<ScrollView
				keyboardShouldPersistTaps='always'
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: 'flex-start',
					paddingHorizontal: '5%',
					alignItems: 'center',
				}}
				alwaysBounceVertical={false}
				showsVerticalScrollIndicator={false}
			>
				<SimplePageHeader title='Informe a Atividade' textStyle={styles.title} />
				<View style={styles.fieldContainer}>
					<Text style={styles.label}>Atividade</Text>
					<View style={{ overflow: 'hidden', borderRadius: 15, width: '100%' }}>
						<Picker
							onValueChange={text =>
								setSelectedTurboTask(todasAtividades.filter(task => task.id === text)[0])
							}
							style={[styles.field, { fontSize: 20, fontWeight: '600' }]}
							selectedValue={selectedTurboTask?.id || ''}
							enabled={true}
						>
							<Picker.Item label='- Selecione a atividade -' value='' />
							{todasAtividades.map(item => {
								return (
									<Picker.Item
										key={item.id}
										label={`${item.nome} - ${item.serie}`}
										value={item.id}
									/>
								)
							})}
						</Picker>
					</View>
				</View>
				<View style={{ marginVertical: 20 }}>
					<Text style={styles.title}>Detalhes da Atividade</Text>
				</View>
				<View style={styles.fieldContainer}>
					<Text style={styles.label}>Descrição da Atividade</Text>
					<Text numberOfLines={10} style={[styles.field, { color: COLORS.secondary600 }]}>
						{selectedTurboTask?.descricao}
					</Text>
				</View>
				<View style={styles.fieldContainer}>
					<Text style={styles.label}>Pontuação</Text>
					<Text style={[styles.field, { color: COLORS.secondary600 }]}>
						{selectedTurboTask?.pontos}
					</Text>
				</View>
				<View style={{ marginTop: 50 }}>
					<PrimaryButton
						avoidClick={selectedTurboTask ? false : true}
						title='Registrar Entrega'
						onPress={() => setIsModalVisible(true)}
					/>
				</View>
			</ScrollView>
			<ConfirmModal
				title='Confirmar Entrega'
				visible={isModalVisible}
				isLoading={isLoading}
				onCancel={() => setIsModalVisible(false)}
				onConfirm={sendChanges}
				text='A atividade será registrada no histórico do aluno como entregue e o mesmo receberá a pontuação atribuída.'
			/>
			<NotifyModal
				visible={success}
				buttonText='Continuar'
				onAccept={() => {
					setSuccess(false)
					navigation.navigate('Delivery0' as never)
				}}
				buttonColor={COLORS.primary500}
				title='Sucesso!'
				text='Entrega de atividade realizada com sucesso!'
			/>
			<NotifyModal
				visible={failure}
				buttonText='Continuar'
				onAccept={() => {
					setFailure(false)
				}}
				title='Erro!'
				buttonColor='#8E2941'
				text='Ocorreu um erro durante a entrega da atividade! Tente novamente!'
			/>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: '#fff',
	},
	fieldContainer: {
		width: '100%',
		marginBottom: 18,
	},
	label: {
		fontSize: 19,
		fontWeight: '600',
		marginBottom: 5,
	},
	field: {
		fontSize: 15,
		padding: 11,
		borderRadius: 15,
		backgroundColor: COLORS.secondary400,
	},
	title: {
		fontSize: 20,
		color: COLORS.primary500,
		fontWeight: '600',
	},
})
