import { RouteProp } from '@react-navigation/native'
import React, { useContext, useState } from 'react'
import { View, Text, ScrollView, StyleSheet, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PrimaryButton } from '../../../components/ui/Buttons'
import { ConfirmModal } from '../../../components/ui/ConfirmModal'
import { ProfileImage } from '../../../components/ui/ProfileImage'
import { SimplePageHeader } from '../../../components/ui/SimplePageHeader'
import { COLORS } from '../../../constants/colors'
import { Student } from '../../../data/students'
import { useNavigation } from '@react-navigation/native'
import { deletarAluno, editarAluno, registerStudent } from '../../../utils/school'
import { AuthContext } from '../../../store/context/authContext'
import { StudentData } from '../../../utils/student'
import { ErrorMessage } from '../../../components/ui/ErrorMessage'
import { NotifyModal } from '../../../components/modals/NotifyModal'
import { Select } from 'native-base'

interface StudentProfileScreenProps {
	route: RouteProp<{ params: { mode: 'create' | 'edit'; student: StudentData } }, 'params'>
}

const emptyStudent: StudentData = {
	nome: '',
	matricula: 0,
	idade: 0,
	serie: '',
	sexo: 'Nao Definido',
	id: '',
	status: null,
	pontos: 0,
	imagemPerfil: null,
	escola: {
		id: '',
		idLogin: 0,
		nome: '',
		email: '',
		nomeGestor: '',
	},
}

export function StudentProfileScreen(props: StudentProfileScreenProps) {
	const navigation = useNavigation()
	const [editable, setEditable] = useState(props.route.params.mode === 'create' ? true : false)

	const student = props.route.params.mode === 'create' ? emptyStudent : props.route.params.student

	const [name, setName] = useState(student.nome)
	const [studentNumber, setStudentNumber] = useState(String(student.matricula))
	const [idade, setIdade] = useState(String(student.idade))
	const [serie, setSerie] = useState(student.serie)
	const [sexo, setSexo] = useState(student.sexo)
	const authCtx = useContext(AuthContext)
	const [confirmModal, setConfirmModal] = useState<'off' | 'save' | 'exclude' | 'create'>('off')
	const [isLoading, setIsLoading] = useState(false)

	const [success1, setSuccess1] = useState(false)
	const [failure1, setFailure1] = useState(false)
	const [success2, setSuccess2] = useState(false)
	const [failure2, setFailure2] = useState(false)
	const [success3, setSuccess3] = useState(false)
	const [failure3, setFailure3] = useState(false)

	function register() {
		if (!isLoading && authCtx.token) {
			setIsLoading(true)
			registerStudent(authCtx.token, {
				idade: Number(idade),
				matricula: String(studentNumber),
				sexo,
				nome: name,
				serie: serie,
			})
				.then(() => {
					setConfirmModal('off')
					setIsLoading(false)
					setSuccess1(true)
				})
				.catch(err => {
					setConfirmModal('off')
					setIsLoading(false)
					setFailure1(true)
				})
		}
	}

	function editStudent() {
		if (!isLoading) {
			setIsLoading(true)
			editarAluno(authCtx.token || '', {
				novoNome: name,
				matriculaAluno: String(student.matricula),
				novaIdade: Number(idade),
				novaSerie: serie,
				novoSexo: sexo,
			})
				.then(res => {
					setConfirmModal('off')
					setIsLoading(false)
					setSuccess2(true)
				})
				.catch(err => {
					setConfirmModal('off')
					setIsLoading(false)
					setFailure2(true)
				})
		}
	}

	function deleteStudent() {
		if (!isLoading) {
			setIsLoading(true)
			deletarAluno(authCtx.token || '', String(student.matricula))
				.then(res => {
					setConfirmModal('off')
					setIsLoading(false)
					setSuccess3(true)
				})
				.catch(err => {
					setConfirmModal('off')
					setIsLoading(false)
					setFailure3(true)
				})
		}
	}

	return (
		<SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
			<ScrollView
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: 'flex-start',
					paddingHorizontal: '5%',
					alignItems: 'center',
				}}
				alwaysBounceVertical={false}
				showsVerticalScrollIndicator={false}
			>
				<SimplePageHeader
					title={
						props.route.params.mode === 'create' ? 'Cadastrar Novo Aluno' : 'Informa????es do Aluno'
					}
				/>
				<View style={{ marginBottom: 27 }}>
					<ProfileImage imgUri='https://cdn-icons-png.flaticon.com/512/149/149071.png' size={150} />
				</View>
				<View style={styles.fieldContainer}>
					<Text style={styles.label}>Nome</Text>
					<TextInput
						style={styles.field}
						value={name}
						onChangeText={text => setName(text)}
						editable={editable}
					/>
				</View>
				<View style={styles.fieldContainer}>
					<Text style={styles.label}>N??mero da Matr??cula</Text>
					<TextInput
						style={styles.field}
						value={studentNumber}
						onChangeText={text => setStudentNumber(text)}
						editable={props.route.params.mode === 'create'}
					/>
				</View>
				<View style={styles.fieldContainer}>
					<Text style={styles.label}>Idade</Text>
					<TextInput
						style={styles.field}
						value={idade}
						keyboardType='number-pad'
						onChangeText={text => setIdade(text)}
						editable={editable}
					/>
				</View>
				<View style={styles.fieldContainer}>
					<Text style={styles.label}>Sexo</Text>
					<View style={{ overflow: 'hidden', borderRadius: 15 }}>
						<Select
							onValueChange={value => setSexo(value)}
							selectedValue={sexo}
							isDisabled={!editable}
							fontSize={20}
							fontWeight={600}
							placeholder=" - Selecione o Sexo - "
							padding={11}
							borderRadius={15}
							backgroundColor={COLORS.secondary400}
						>
							<Select.Item label="N??o Definido" value="Nao Definido" />
							<Select.Item label='Masculino' value='Masc' />
							<Select.Item label='Feminino' value='Fem' />
						</Select>
					</View>
				</View>
				<View style={styles.fieldContainer}>
					<Text style={styles.label}>S??rie</Text>
					<View style={{ overflow: 'hidden', borderRadius: 15 }}>
						<Select
							onValueChange={text => setSerie(text)}
							selectedValue={serie}
							isDisabled={!editable}
							fontSize={20}
							fontWeight={600}
							placeholder=" - Selecione a S??rie - "
							padding={11}
							borderRadius={15}
							backgroundColor={COLORS.secondary400}
						>
							<Select.Item label='- N??o Definida -' value='Nao Definido' />
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

				<View style={styles.fieldContainer}>
					<Text style={styles.label}>Senha</Text>
					<TextInput
						editable={false}
						style={styles.field}
						value={String(studentNumber) + Number(idade).toFixed(0) + '2022'}
						secureTextEntry={!editable}
					/>
				</View>
				{/* <View style={{ width: '100%', alignItems: 'center', marginTop: 5 }}>
					<ErrorMessage isActive={creationError}>N??o foi poss??vel cadastrar o aluno!</ErrorMessage>
				</View> */}

				{props.route.params.mode === 'create' ? (
					<View style={{ alignItems: 'center', paddingTop: 15, paddingBottom: 20 }}>
						<PrimaryButton title='Cadastrar' onPress={() => setConfirmModal('create')} />
					</View>
				) : !editable ? (
					<View style={{ alignItems: 'center', paddingTop: 15, paddingBottom: 20 }}>
						<PrimaryButton title='Editar Informa????es' onPress={() => setEditable(true)} />
					</View>
				) : (
					<View
						style={{
							alignItems: 'center',
							flexDirection: 'row',
							justifyContent: 'space-around',
							paddingTop: 15,
							paddingBottom: 20,
						}}
					>
						<PrimaryButton
							title='Salvar'
							onPress={() => setConfirmModal('save')}
							marginRight={10}
						/>
						<PrimaryButton
							title='Excluir'
							innerContainerStyle={{ backgroundColor: '#8E2941' }}
							onPress={() => setConfirmModal('exclude')}
							marginLeft={10}
						/>
					</View>
				)}
			</ScrollView>

			<ConfirmModal
				visible={confirmModal === 'save'}
				title='Salvar altera????es?'
				isLoading={isLoading}
				text='As altera????es ser??o salvas no sistema. A pontua????o do aluno n??o ser?? alterada.'
				onCancel={() => setConfirmModal('off')}
				onConfirm={editStudent}
			/>
			<ConfirmModal
				visible={confirmModal === 'exclude'}
				title='Voc?? tem certeza?'
				isLoading={isLoading}
				text='Ao confirmar, toda a pontua????o do aluno ser?? perdida. Essa a????o n??o poder?? ser revertida.'
				onCancel={() => setConfirmModal('off')}
				onConfirm={deleteStudent}
			/>
			<ConfirmModal
				visible={confirmModal === 'create'}
				title='Cadastrar Aluno?'
				isLoading={isLoading}
				text='Confirmar inser????o do aluno no sistema? Alunos cadastrados come??am sem pontua????o.'
				onCancel={() => setConfirmModal('off')}
				onConfirm={register}
			/>
			<NotifyModal
				visible={success1}
				buttonText='Continuar'
				onAccept={() => {
					setSuccess1(false)
					navigation.navigate('ManageStudents' as never)
				}}
				buttonColor={COLORS.primary500}
				title='Sucesso!'
				text='Aluno cadastrado com sucesso!'
			/>
			<NotifyModal
				visible={failure1}
				buttonText='Continuar'
				onAccept={() => {
					setFailure1(false)
				}}
				title='Erro!'
				buttonColor='#8E2941'
				text='Ocorreu um erro durante o cadastro do aluno! Tente novamente!'
			/>
			<NotifyModal
				visible={success2}
				buttonText='Continuar'
				onAccept={() => {
					setSuccess2(false)
					navigation.navigate('ManageStudents' as never)
				}}
				buttonColor={COLORS.primary500}
				title='Sucesso!'
				text='Aluno editado com sucesso!'
			/>
			<NotifyModal
				visible={failure2}
				buttonText='Continuar'
				onAccept={() => {
					setFailure2(false)
				}}
				title='Erro!'
				buttonColor='#8E2941'
				text='Ocorreu um erro durante a edi????o do aluno! Tente novamente!'
			/>
			<NotifyModal
				visible={success3}
				buttonText='Continuar'
				onAccept={() => {
					setSuccess3(false)
					navigation.navigate('ManageStudents' as never)
				}}
				buttonColor={COLORS.primary500}
				title='Sucesso!'
				text='Aluno exclu??do com sucesso!'
			/>
			<NotifyModal
				visible={failure3}
				buttonText='Continuar'
				onAccept={() => {
					setFailure3(false)
				}}
				title='Erro!'
				buttonColor='#8E2941'
				text='Ocorreu um erro durante a exclus??o do aluno! Tente novamente!'
			/>
		</SafeAreaView >
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
		fontSize: 19,
		fontWeight: '600',
		padding: 11,
		borderRadius: 15,
		backgroundColor: COLORS.secondary400,
	},
})
