import { View, Text, Button, StyleSheet, ScrollView, Alert, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CustomButton, PrimaryButton } from '../../components/ui/Buttons'
import { COLORS } from '../../constants/colors'
import { PrimaryTextInput } from '../../components/ui/TextInputs'
import { LinearGradient } from 'expo-linear-gradient'
import { useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { signUp } from '../../utils/auth'
import { AuthContext } from '../../store/context/authContext'
import { LoadingScreen } from '../ui/LoadingScreen'
import { isEmailValid, isPasswordLong } from '../../utils/verification'

interface Erros {
	invalidEmail: boolean
	shortPassword: boolean
	emptyEmail: boolean
	emptyPassword: boolean
	emailOrPasswordWrong: boolean
}

export function RegisterScreen() {
	const [isAuthenticating, setIsAuthenticating] = useState(false)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const navigation = useNavigation()
	const [errors, setErros] = useState<Erros>({
		invalidEmail: false,
		shortPassword: false,
		emptyEmail: false,
		emptyPassword: false,
		emailOrPasswordWrong: false,
	})

	const authCtx = useContext(AuthContext)

	function validateData() {
		let isDataValid = true
		if (!isEmailValid(email)) {
			setErros(cErros => {
				return { ...cErros, invalidEmail: true }
			})
			isDataValid = false
		} else {
			setErros(cErros => {
				return { ...cErros, invalidEmail: false }
			})
		}
		if (!isPasswordLong(password)) {
			setErros(cErros => {
				return { ...cErros, shortPassword: true }
			})
			isDataValid = false
		} else {
			setErros(cErros => {
				return { ...cErros, shortPassword: false }
			})
		}
		if (!email.trim()) {
			setErros(cErros => {
				return { ...cErros, emptyEmail: true, invalidEmail: false }
			})
			isDataValid = false
		} else {
			setErros(cErros => {
				return { ...cErros, emptyEmail: false }
			})
		}
		if (!password.trim()) {
			setErros(cErros => {
				return { ...cErros, emptyPassword: true }
			})
			isDataValid = false
		} else {
			setErros(cErros => {
				return { ...cErros, emptyPassword: false }
			})
		}
		return isDataValid
	}

	async function signUpHandler() {
		if (validateData()) {
			setIsAuthenticating(true)
			try {
				await signUp(email, password)
				navigation.navigate('Login' as never)
			} catch (error) {
				Alert.alert('Informações inválidas!', 'Confira suas credenciais e tente novamente.')
				setIsAuthenticating(false)
			}
		} else {
			console.log('Informações Incorretas')
		}
	}

	if (isAuthenticating) {
		return <LoadingScreen />
	} else {
		return (
			<SafeAreaView style={styles.root}>
				<View>
					<ScrollView
						style={{ flexGrow: 1 }}
						alwaysBounceVertical={false}
						showsVerticalScrollIndicator={false}
					>
						<View
							style={{
								width: '80%',
								paddingVertical: 20,
								alignItems: 'center',
								alignSelf: 'center',
							}}
						>
							<View style={{ width: '100%', marginBottom: 37 }}>
								<Text style={styles.title}>Bem-Vindo</Text>
								<View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
									<Text style={[styles.title, { fontSize: 17, lineHeight: 30 }]}>ao</Text>
									<Text style={styles.title}> Recicla!</Text>
								</View>

								<View style={{ width: '100%', marginBottom: 50 }}>
									<Text style={[styles.title, { fontSize: 17 }]}>Crie sua conta</Text>
								</View>
							</View>
							<TextInput
								placeholder='Digite seu e-mail'
								value={email}
								onChangeText={(text: string) => setEmail(text)}
								style={{
									width: '100%',
									height: 50,
									marginBottom: 28,
									backgroundColor: '#EEEEEE',
									borderRadius: 16,
									paddingHorizontal: 21,
								}}
							/>

							<TextInput
								placeholder='Digite sua senha'
								secureTextEntry
								value={password}
								onChangeText={(text: string) => setPassword(text)}
								style={{
									width: '100%',
									height: 50,
									marginBottom: 12,
									backgroundColor: '#EEEEEE',
									borderRadius: 16,
									paddingHorizontal: 21,
								}}
							/>

							<CustomButton
								style={{ marginBottom: 66 }}
								title='Esqueci minha senha'
								onPress={() => console.log('oi')}
								textStyle={{ color: '#1a6dbb' }}
							/>

							<View style={{ width: '100%', marginBottom: 32, alignItems: 'center' }}>
								<PrimaryButton title='Cadastrar' onPress={signUpHandler} />
							</View>

							<View style={[styles.registerContainer, { marginBottom: 34 }]}>
								<Text>Já possui uma conta? </Text>
								<CustomButton
									title='Logue-se'
									onPress={() => navigation.navigate('Login' as any)}
									textStyle={{ color: '#1a6dbb' }}
								/>
							</View>
						</View>
					</ScrollView>
				</View>
			</SafeAreaView>
		)
	}
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#fff',
	},
	container: {
		flex: 1,
		alignItems: 'center',
	},
	registerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 30,
		color: COLORS.primary500,
		fontWeight: '600',
	},
})
