import { RouteProp } from '@react-navigation/native'
import { useState } from 'react'
import { View, Text, ScrollView, StyleSheet, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PrimaryButton } from '../../../components/ui/Buttons'
import { ConfirmModal } from '../../../components/ui/ConfirmModal'
import { ProfileImage } from '../../../components/ui/ProfileImage'
import { SimplePageHeader } from '../../../components/ui/SimplePageHeader'
import { COLORS } from '../../../constants/colors'
import { Student } from '../../../data/students'
import { useNavigation } from '@react-navigation/native'

interface StudentProfileScreenProps {
	route: RouteProp<{ params: { student: Student } }, 'params'>
}

export function StudentProfileScreen(props: StudentProfileScreenProps) {
	const navigation = useNavigation()
	const [editable, setEditable] = useState(false)
	const student = props.route.params.student
	const [name, setName] = useState(student.nome)
	const [studentNumber, setStudentNumber] = useState(student.studentCode)
	const [serie, setSerie] = useState('5º ano')
	const [password, setPassword] = useState('123456')
	const [confirmModal, setConfirmModal] = useState<'off' | 'save' | 'exclude'>('off')
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
		<SafeAreaView style={styles.root}>
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
				<SimplePageHeader title='Informações do Aluno' />
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
					<TextInput
						style={styles.field}
						value={serie}
						onChangeText={text => setSerie(text)}
						editable={editable}
					/>
				</View>
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
			{!editable ? (
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
