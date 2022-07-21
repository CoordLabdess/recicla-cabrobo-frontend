import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '../../../constants/colors'
import { PrimaryButton } from '../../../components/ui/Buttons'
import { useState } from 'react'
import { ErrorMessage } from '../../../components/ui/ErrorMessage'
import { useNavigation } from '@react-navigation/native'

interface Errors {
	emptyId: boolean
	notFound: boolean
}

export function NewDeliveryScreen() {
	const navigation = useNavigation()
	const [studentNumber, setStudentNumber] = useState('')
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
			await setTimeout(() => {
				if (studentNumber.trim().length < 3) {
					setErrors(cErros => {
						return { ...cErros, notFound: true }
					})
				} else {
					setErrors(cErros => {
						return { ...cErros, notFound: false }
					})
					navigation.navigate('Delivery2' as never)
				}
				setIsLoading(false)
			}, 1000)
		}
	}

	return (
		<SafeAreaView style={styles.root}>
			<ScrollView
				keyboardShouldPersistTaps='handled'
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: 'center',
					paddingHorizontal: '10%',
					alignItems: 'center',
				}}
				alwaysBounceVertical={false}
				showsVerticalScrollIndicator={false}
			>
				<Text style={styles.title}>Nova Entrega de Materiais</Text>
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
					innerContainerStyle={{ paddingHorizontal: 35 }}
					style={{ width: 250, marginBottom: 50 }}
					textStyle={{ fontSize: 16 }}
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
		fontSize: 24,
		color: COLORS.primary500,
		marginBottom: 150,
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
})
