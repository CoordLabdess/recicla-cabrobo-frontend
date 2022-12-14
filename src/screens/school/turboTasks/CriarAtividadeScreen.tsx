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
import { AtividadeDataOutput, CriarAtividadeDataInput } from '../../../types/atividades.type'
import { NotifyModal } from '../../../components/modals/NotifyModal'
import { Select } from 'native-base'

const atividadeEmBranco: CriarAtividadeDataInput = {
	nomeAtividade: '',
	pontos: 0,
	serie: 'Nao Definida',
	descricao: '',
	prazoFinal:
		String(new Date().getDay()) +
		'-' +
		String(new Date().getMonth()) +
		'-' +
		String(new Date().getFullYear()),
}

export function CriarAtividadeScreen() {
	const authCtx = useContext(AuthContext)
	const navigation = useNavigation()
	const [date, setDate] = useState(new Date())
	const [show, setShow] = useState(false)
	const [atividade, setAtividade] = useState<CriarAtividadeDataInput>(atividadeEmBranco)
	const [success, setSuccess] = useState(false)
	const [failure, setFailure] = useState(false)

	const [isLoading, setIsLoading] = useState(false)

	function onChangeDate(event: DateTimePickerEvent, currentDate?: Date) {
		const d = currentDate || date
		setShow(false)
		setDate(d)
	}

	function formatDate(d: Date) {
		console.log(d.getDate())
		return (
			d.getDate().toString().padStart(2, '0') +
			'-' +
			(d.getMonth() + 1).toString().padStart(2, '0') +
			'-' +
			d.getFullYear().toString()
		)
	}

	function formatDate2(d: Date) {
		return (
			d.getFullYear().toString() +
			'-' +
			(d.getMonth() + 1).toString().padStart(2, '0') +
			'-' +
			d.getDate().toString().padStart(2, '0')
		)
	}

	async function createTask() {
		if (!isLoading) {
			setIsLoading(true)
			await criarAtividade(authCtx.token || '', {
				nomeAtividade: atividade.nomeAtividade,
				descricao: atividade.descricao,
				serie: atividade.serie,
				pontos: atividade.pontos,
				prazoFinal: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
			})
				.then(res => {
					setIsLoading(false)
					setSuccess(true)
				})
				.catch(err => {
					setFailure(true)
					setIsLoading(false)
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
				<SimplePageHeader textStyle={styles.title} title={'Criar Atividade'} />
				<View style={styles.elementContainer}>
					<Text style={styles.label}>T??tulo</Text>

					<TextInput
						editable
						onChangeText={text => {
							setAtividade({ ...atividade, nomeAtividade: text })
						}}
						style={styles.textInput}
						value={atividade.nomeAtividade}
					/>
				</View>
				<View style={styles.elementContainer}>
					<Text style={styles.label}>Descri????o</Text>

					<TextInput
						numberOfLines={3}
						editable
						onChangeText={text => {
							setAtividade({ ...atividade, descricao: text })
						}}
						style={[styles.textInput, { textAlignVertical: 'top' }]}
						value={atividade.descricao}
					/>
				</View>
				<View style={styles.elementContainer}>
					<Text style={styles.label}>S??rie</Text>
					<View style={{ overflow: 'hidden', borderRadius: 15 }}>
						<Select
							selectedValue={atividade.serie}
							onValueChange={value => {
								setAtividade({ ...atividade, serie: value })
							}}
							fontSize={20}
							fontWeight={600}
							backgroundColor={COLORS.secondary400}
							py={9}
							px={17}
							borderRadius={16}
							placeholder="- Selecione uma turma -"
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
									setAtividade({ ...atividade, pontos: Number(text) })
								}}
								value={atividade.pontos.toString()}
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
				<View style={{ marginTop: 20 }}>
					<PrimaryButton title={'Criar'} isLoading={isLoading} onPress={createTask} />
				</View>
				<NotifyModal
					visible={success}
					buttonText='Continuar'
					onAccept={() => {
						setSuccess(false)
						navigation.navigate('Atividades' as never)
					}}
					buttonColor={COLORS.primary500}
					title='Sucesso!'
					text='Atividade criada com sucesso!'
				/>
				<NotifyModal
					visible={failure}
					buttonText='Continuar'
					onAccept={() => {
						setFailure(false)
					}}
					title='Erro!'
					buttonColor='#8E2941'
					text='Ocorreu um erro durante o cadastro da atividade! Tente novamente!'
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
