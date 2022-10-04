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
import { Picker } from '@react-native-picker/picker'
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

	const [isLoading, setIsLoading] = useState(false)

	function onChangeDate(event: DateTimePickerEvent, currentDate?: Date) {
		const d = currentDate || date
		setShow(false)
		setDate(d)
	}

	function formatDate(d: Date) {
		return (
			d.getDay().toString().padStart(2, '0') +
			'-' +
			(d.getMonth() + 1).toString().padStart(2, '0') +
			'-' +
			d.getFullYear().toString()
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
				prazoFinal: formatDate(date),
			})
				.then(res => {
					console.log(res)
					setIsLoading(false)
					navigation.navigate('Atividades' as never)
				})
				.catch(err => {
					console.log(err)
					setIsLoading(false)
				})
		}
	}

	return (
		<SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
			<ScrollView
				keyboardShouldPersistTaps='always'
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
					<Text style={styles.label}>Título</Text>

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
					<Text style={styles.label}>Série</Text>
					<View style={{ overflow: 'hidden', borderRadius: 15 }}>
						<Picker
							style={[styles.textInput, { fontSize: 20, fontWeight: '600' }]}
							selectedValue={atividade.serie}
							onValueChange={value => {
								setAtividade({ ...atividade, serie: value })
							}}
							enabled={true}
						>
							<Picker.Item label='- Selecione uma turma -' value='' />
							<Picker.Item label='4º ano' value='4º ano' />
							<Picker.Item label='5º ano' value='5º ano' />
							<Picker.Item label='6º ano' value='6º ano' />
							<Picker.Item label='7º ano' value='7º ano' />
							<Picker.Item label='8º ano' value='8º ano' />
							<Picker.Item label='9º ano' value='9º ano' />
							<Picker.Item label='Multisérie' value='Multiserie' />
						</Picker>
					</View>
				</View>
				<View style={styles.elementContainer}>
					<Text style={styles.label}>Pontuação</Text>
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
