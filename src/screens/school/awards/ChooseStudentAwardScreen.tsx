import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '../../../constants/colors'
import { PrimaryButton } from '../../../components/ui/Buttons'
import { useContext, useState } from 'react'
import { ErrorMessage } from '../../../components/ui/ErrorMessage'
import { RouteProp, useNavigation } from '@react-navigation/native'
import { SimplePageHeader } from '../../../components/ui/SimplePageHeader'
import { students } from '../../../data/students'
import { getStudentByMatricula } from '../../../utils/school'
import { AuthContext } from '../../../store/context/authContext'

interface Errors {
	emptyId: boolean
	notFound: boolean
}

interface ChooseStudentAwardScreenProps {
	route: RouteProp<{ params: { type: 'materials' | 'turboTasks' } }, 'params'>
}

export function ChooseStudentAwardScreen(props: ChooseStudentAwardScreenProps) {
	const navigation = useNavigation()
	const [studentNumber, setStudentNumber] = useState('')
	const authCtx = useContext(AuthContext)
	const [isLoading, setIsLoading] = useState(false)
	const [errors, setErrors] = useState<Errors>({
		emptyId: false,
		notFound: false,
	})

	function validateData() {
		let isDataValid = true
		if (!studentNumber.trim()) {
			setErrors(cErrors => {
				return { ...cErrors, emptyId: true }
			})
			isDataValid = false
		} else {
			setErrors(cErrors => {
				return { ...cErrors, emptyId: false }
			})
		}
		return isDataValid
	}

	async function sendStudentNumber() {
		if (validateData()) {
			setIsLoading(true)
			await getStudentByMatricula(studentNumber, authCtx.token as string)
				.then(response => {
					setErrors(cErros => {
						return { ...cErros, notFound: false }
					})
					console.log('aaaa')
					navigation.navigate('Award2' as never, { student: response } as never)
				})
				.catch(error => {
					console.log('bbbbb')
					setErrors(cErros => {
						return { ...cErros, notFound: true }
					})
				})
			setIsLoading(false)
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
				<SimplePageHeader title='Informar Aluno' textStyle={styles.title} />

				<Text style={styles.description}>
					Associe uma nova entrega ao perfil de um aluno. Insira as informações solicitadas em cada
					campo do formulário.
				</Text>

				<Text style={styles.label}>Número de matrícula do aluno</Text>
				<View style={styles.inputContainer}>
					<TextInput
						value={studentNumber}
						keyboardType='number-pad'
						onChangeText={(text: string) => setStudentNumber(text)}
						style={styles.input}
					/>
					<ErrorMessage isActive={errors.notFound}>
						Id do aluno não encontrado no sistema!
					</ErrorMessage>
					<ErrorMessage isActive={errors.emptyId}>O campo deve ser preenchido!</ErrorMessage>
				</View>
				<PrimaryButton
					isLoading={isLoading}
					textStyle={{ fontSize: 20 }}
					title='Realizar Nova Entrega'
					onPress={sendStudentNumber}
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
	input: {
		fontSize: 25,
		height: 52,
		textAlign: 'center',
		backgroundColor: '#EEEEEE',
		borderRadius: 16,
		paddingHorizontal: 21,
	},
	label: {
		color: COLORS.secondary500,
		fontSize: 18,
		marginBottom: 10,
	},
	inputContainer: {
		width: '85%',
		marginBottom: 32,
	},
	description: {
		color: COLORS.secondary500,
		lineHeight: 22,
		marginHorizontal: '5%',
		marginTop: 40,
		marginBottom: 60,
		textAlign: 'center',
	},
})
