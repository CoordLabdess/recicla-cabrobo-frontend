import { RouteProp } from '@react-navigation/native'
import { useState } from 'react'
import { View, Text, ScrollView, StyleSheet, TextInput } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PrimaryButton } from '../../../components/ui/Buttons'
import { ConfirmModal } from '../../../components/ui/ConfirmModal'
import { ProfileImage } from '../../../components/ui/ProfileImage'
import { SimplePageHeader } from '../../../components/ui/SimplePageHeader'
import { COLORS } from '../../../constants/colors'
import { Student } from '../../../data/students'
import { useNavigation } from '@react-navigation/native'

interface StudentProfileScreenProps {
	route: RouteProp<{ params: { mode: 'create' | 'edit'; student: Student } }, 'params'>
}

const emptyStudent = {
	nome: '',
	email: '',
	image: '',
	studentCode: '',
	serie: '',
	password: '',
}

export function StudentProfileScreen(props: StudentProfileScreenProps) {
	const navigation = useNavigation()
	const [editable, setEditable] = useState(props.route.params.mode === 'create' ? true : false)

	const student =
		props.route.params.mode === 'create'
			? emptyStudent
			: { ...props.route.params.student, password: '123456', serie: '5º ano' }
	const [name, setName] = useState(student.nome)
	const [studentNumber, setStudentNumber] = useState(student.studentCode)
	const [serie, setSerie] = useState(student.serie)
	const [password, setPassword] = useState(student.password)
	const [confirmModal, setConfirmModal] = useState<'off' | 'save' | 'exclude' | 'create'>('off')
	const [isLoading, setIsLoading] = useState(false)

	async function fakeFetching() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve('')
			}, 1000)
		})
	}

	function sendChanges() {
		setIsLoading(true)
		fakeFetching()
			.then(response => {
				setIsLoading(false)
				navigation.navigate('ManageStudents' as never)
			})
			.catch(error => {
				setIsLoading(false)
			})
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
				<SimplePageHeader
					title={
						props.route.params.mode === 'create' ? 'Cadastrar Novo Aluno' : 'Informações do Aluno'
					}
				/>
				<View style={{ marginBottom: 27 }}>
					<ProfileImage
						imgUri='https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
						size={150}
					/>
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
					<Text style={styles.label}>Número da Matrícula</Text>
					<TextInput
						style={styles.field}
						value={studentNumber}
						onChangeText={text => setStudentNumber(text)}
						editable={editable}
					/>
				</View>
				<View style={styles.fieldContainer}>
					<Text style={styles.label}>Série</Text>
					<View style={{ overflow: 'hidden', borderRadius: 15 }}>
						<Picker
							onValueChange={text => setSerie(text)}
							style={[styles.field, { fontSize: 20, fontWeight: '600' }]}
							selectedValue={serie}
							enabled={editable}
						>
							<Picker.Item label='- Selecione uma turma -' value='' />
							<Picker.Item label='1º ano' value='1º ano' />
							<Picker.Item label='2º ano' value='2º ano' />
							<Picker.Item label='3º ano' value='3º ano' />
							<Picker.Item label='4º ano' value='4º ano' />
							<Picker.Item label='5º ano' value='5º ano' />
							<Picker.Item label='6º ano' value='6º ano' />
							<Picker.Item label='7º ano' value='7º ano' />
							<Picker.Item label='8º ano' value='8º ano' />
							<Picker.Item label='9º ano' value='9º ano' />
							<Picker.Item label='1º médio' value='1º médio' />
							<Picker.Item label='2º médio' value='2º médio' />
							<Picker.Item label='3º médio' value='3º médio' />
						</Picker>
					</View>
				</View>
				{/*<View style={styles.fieldContainer}>
					<Text style={styles.label}>Série</Text>
					<TextInput
						style={styles.field}
						value={serie}
						onChangeText={text => setSerie(text)}
						editable={editable}
					/>
				</View>*/}
				<View style={styles.fieldContainer}>
					<Text style={styles.label}>Senha</Text>
					<TextInput
						style={styles.field}
						value={password}
						onChangeText={text => setPassword(text)}
						secureTextEntry={!editable}
						editable={editable}
					/>
				</View>
			</ScrollView>

			{props.route.params.mode === 'create' ? (
				<View style={{ alignItems: 'center', paddingTop: 15, paddingBottom: 20 }}>
					<PrimaryButton title='Cadastrar' onPress={() => setConfirmModal('create')} />
				</View>
			) : !editable ? (
				<View style={{ alignItems: 'center', paddingTop: 15, paddingBottom: 20 }}>
					<PrimaryButton title='Editar Informações' onPress={() => setEditable(true)} />
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
					<PrimaryButton title='Salvar' onPress={() => setConfirmModal('save')} />
					<PrimaryButton
						title='Excluir'
						innerContainerStyle={{ backgroundColor: '#8E2941' }}
						onPress={() => setConfirmModal('exclude')}
					/>
				</View>
			)}
			<ConfirmModal
				visible={confirmModal === 'save'}
				title='Salvar alterações?'
				isLoading={isLoading}
				text='As alterações serão salvas no sistema. A pontuação do aluno não será alterada.'
				onCancel={() => setConfirmModal('off')}
				onConfirm={sendChanges}
			/>
			<ConfirmModal
				visible={confirmModal === 'exclude'}
				title='Você tem certeza?'
				isLoading={isLoading}
				text='Ao confirmar, toda a pontuação do aluno será perdida. Essa ação não poderá ser revertida.'
				onCancel={() => setConfirmModal('off')}
				onConfirm={sendChanges}
			/>
			<ConfirmModal
				visible={confirmModal === 'create'}
				title='Cadastrar Aluno?'
				isLoading={isLoading}
				text='Confirmar inserção do aluno no sistema? Alunos cadastrados começam sem pontuação.'
				onCancel={() => setConfirmModal('off')}
				onConfirm={sendChanges}
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
		fontSize: 19,
		fontWeight: '600',
		padding: 11,
		borderRadius: 15,
		backgroundColor: COLORS.secondary400,
	},
})
