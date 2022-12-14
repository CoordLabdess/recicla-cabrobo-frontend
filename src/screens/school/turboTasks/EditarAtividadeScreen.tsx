import { RouteProp } from '@react-navigation/native'
import React, { useContext, useEffect, useState } from 'react'
import {
	View,
	Text,
	StyleSheet,
	_ScrollView,
	ScrollView,
	TextInput,
	Button,
	Pressable,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SimplePageHeader } from '../../../components/ui/SimplePageHeader'
import { COLORS } from '../../../constants/colors'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { PrimaryButton } from '../../../components/ui/Buttons'
import { useNavigation } from '@react-navigation/native'
import {
	atualizarAtividade,
	criarAtividade,
	deletarAtividade,
	excluirAtividade,
} from '../../../utils/school'
import { AuthContext } from '../../../store/context/authContext'
import {
	AtividadeDataOutput,
	AtualizarAtividadeDataInput,
	CriarAtividadeDataInput,
} from '../../../types/atividades.type'
import { NotifyModal } from '../../../components/modals/NotifyModal'
import { Select } from 'native-base'

interface EditarAtividadeScreen {
	route: RouteProp<{ params: { atividade: AtividadeDataOutput } }>
}

export function EditarAtividadeScreen(props: EditarAtividadeScreen) {
	const authCtx = useContext(AuthContext)
	const navigation = useNavigation()
	const [show, setShow] = useState(false)
	const atvd = props.route.params.atividade
	const [date, setDate] = useState(
		new Date(
			new Date(atvd.prazofinal).getFullYear(),
			new Date(atvd.prazofinal).getMonth(),
			new Date(atvd.prazofinal).getDate(),
		),
	)

	const [atividade, setAtividade] = useState<AtualizarAtividadeDataInput>({
		idAtividade: atvd.id,
		novoNome: atvd.nome,
		novaDescricao: atvd.descricao,
		novaPontuacao: atvd.pontos,
		novaSerie: atvd.serie,
		novoPrazo: atvd.prazofinal,
	})

	const [isLoading1, setIsLoading1] = useState(false)
	const [isLoading2, setIsLoading2] = useState(false)
	const [success1, setSuccess1] = useState(false)
	const [failure1, setFailure1] = useState(false)

	function onChangeDate(event: DateTimePickerEvent, currentDate?: Date) {
		const d = currentDate || date
		setShow(false)
		setDate(d)
	}

	function formatDate1(d: Date) {
		return (
			(d.getDate() + 1).toString().padStart(2, '0') +
			'-' +
			(d.getMonth() + 1).toString().padStart(2, '0') +
			'-' +
			d.getFullYear().toString()
		)
	}

	function formatDate(d: Date) {
		return (
			d.getDate().toString().padStart(2, '0') +
			'-' +
			(d.getMonth() + 1).toString().padStart(2, '0') +
			'-' +
			d.getFullYear().toString()
		)
	}

	async function updateTask() {
		if (!isLoading1) {
			setIsLoading1(true)
			await atualizarAtividade(authCtx.token || '', {
				idAtividade: atividade.idAtividade,
				novoNome: atividade.novoNome,
				novaDescricao: atividade.novaDescricao,
				novaPontuacao: atividade.novaPontuacao,
				novaSerie: atividade.novaSerie,
				novoPrazo: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
			})
				.then(res => {
					setIsLoading1(false)
					setSuccess1(true)
				})
				.catch(err => {
					setIsLoading1(false)
					setFailure1(true)
				})
		}
	}

	async function deleteTask() {
		if (!isLoading2) {
			setIsLoading2(true)
			await deletarAtividade(authCtx.token || '', atividade.idAtividade)
				.then(res => {
					setIsLoading2(false)
					navigation.navigate('Atividades' as never)
				})
				.catch(err => {
					setIsLoading2(false)
				})
		}
	}

	return (
		<SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
			<ScrollView
				contentContainerStyle={{
					flexGrow: 1,
					paddingBottom: 20,
					justifyContent: 'flex-start',
					paddingHorizontal: '5%',
					alignItems: 'center',
				}}
				alwaysBounceVertical={false}
				showsVerticalScrollIndicator={false}
			>
				<SimplePageHeader textStyle={styles.title} title={'Editar Atividade'} />
				<View style={styles.elementContainer}>
					<Text style={styles.label}>T??tulo</Text>

					<TextInput
						editable
						onChangeText={text => {
							setAtividade({ ...atividade, novoNome: text })
						}}
						style={styles.textInput}
						value={atividade.novoNome}
					/>
				</View>
				<View style={styles.elementContainer}>
					<Text style={styles.label}>Descri????o</Text>

					<TextInput
						numberOfLines={3}
						editable
						onChangeText={text => {
							setAtividade({ ...atividade, novaDescricao: text })
						}}
						style={[styles.textInput, { textAlignVertical: 'top' }]}
						value={atividade.novaDescricao}
					/>
				</View>
				<View style={styles.elementContainer}>
					<Text style={styles.label}>S??rie</Text>
					<View style={{ overflow: 'hidden', borderRadius: 15 }}>
						<Select
							fontSize={20}
							fontWeight={600}
							onValueChange={value => {
								setAtividade({ ...atividade, novaSerie: value })
							}}
							backgroundColor={COLORS.secondary400}
							py={9}
							px={17}
							borderRadius={16}
							placeholder="Selecione uma s??rie"
						>
							<Select.Item label='4?? ano' value='4?? ano' />
							<Select.Item label='5?? ano' value='5?? ano' />
							<Select.Item label='6?? ano' value='6?? ano' />
							<Select.Item label='7?? ano' value='7?? ano' />
							<Select.Item label='8?? ano' value='8?? ano' />
							<Select.Item label='9?? ano' value='9?? ano' />
							<Select.Item label='Multis??rie' value='Multiserie' />
						</Select>
					</View>
				</View>
				<View style={styles.elementContainer}>
					<Text style={styles.label}>Pontua????o</Text>
					<View style={{ width: '100%', alignItems: 'center' }}>
						<View style={{ borderBottomWidth: 2, borderColor: COLORS.secondary500 }}>
							<TextInput
								keyboardType='number-pad'
								style={styles.points}
								onChangeText={text => {
									setAtividade({ ...atividade, novaPontuacao: Number(text) })
								}}
								value={atividade.novaPontuacao.toString()}
							/>
						</View>
					</View>
				</View>
				<View style={styles.elementContainer}>
					<Text style={styles.label}>Data limite</Text>
					<View style={{ width: '100%', alignItems: 'center' }}>
						<Pressable
							style={{ borderBottomWidth: 2, borderColor: COLORS.secondary500 }}
							onPress={() => setShow(true)}
						>
							<Text style={styles.points}>{formatDate(date)}</Text>
						</Pressable>
					</View>
					{show && <DateTimePicker value={date} onChange={onChangeDate} />}
				</View>
				<View style={{ marginTop: 20, flexDirection: 'row' }}>
					<PrimaryButton
						title={'Salvar'}
						isLoading={isLoading1}
						avoidClick={isLoading2}
						onPress={updateTask}
						marginRight={10}
						outterContainerStyle={{ width: 140 }}
					/>
					<PrimaryButton
						title={'Excluir'}
						isLoading={isLoading2}
						avoidClick={isLoading1}
						onPress={deleteTask}
						marginLeft={10}
						innerContainerStyle={{ backgroundColor: '#8E2941' }}
						outterContainerStyle={{ width: 140 }}
					/>
				</View>
				<NotifyModal
					visible={success1}
					buttonText='Continuar'
					onAccept={() => {
						setSuccess1(false)
						navigation.navigate('Atividades' as never)
					}}
					buttonColor={COLORS.primary500}
					title='Sucesso!'
					text='Atividade editada com sucesso!'
				/>
				<NotifyModal
					visible={failure1}
					buttonText='Continuar'
					onAccept={() => {
						setFailure1(false)
					}}
					title='Erro!'
					buttonColor='#8E2941'
					text='Ocorreu um erro durante a edi????o da atividade! Tente novamente!'
				/>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: '#fff',
	},
	title: {
		fontSize: 20,
		color: COLORS.primary500,
		fontWeight: '600',
	},
	elementContainer: {
		width: '100%',
		marginBottom: 20,
	},
	label: {
		fontSize: 19,
		fontWeight: '600',
		marginBottom: 6,
	},
	textInput: {
		backgroundColor: COLORS.secondary400,
		fontSize: 14,
		paddingVertical: 9,
		paddingHorizontal: 17,
		borderRadius: 16,
	},
	points: {
		textAlign: 'center',
		fontSize: 40,
		color: COLORS.secondary500,
	},
})
