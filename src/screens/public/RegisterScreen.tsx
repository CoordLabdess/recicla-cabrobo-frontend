import { View, Text, Button, StyleSheet, ScrollView, Alert, TextInput, Image } from 'react-native'
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
import { ErrorMessage } from '../../components/ui/ErrorMessage'

interface Erros {
	invalidEmail: boolean
	shortPassword: boolean
	emptyEmail: boolean
	emptyPassword: boolean
	emailOrPasswordWrong: boolean
	emailUnavaiable: boolean
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
		emailUnavaiable: false,
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
				setErros(cErros => {
					return { ...cErros, emailUnavaiable: true }
				})
				setIsAuthenticating(false)
			}
		} else {
			console.log('Informações Incorretas')
		}
	}

	return (
		<SafeAreaView style={styles.root}>
			<View>
				<ScrollView
					keyboardShouldPersistTaps='handled'
					style={{ flexGrow: 1 }}
					alwaysBounceVertical={false}
					showsVerticalScrollIndicator={false}
				>
					<LinearGradient colors={['#90d485', '#fff', '#fff', '#fff']} style={{ flex: 1 }}>
						<View style={styles.imageContainer}>
							<Image
								resizeMode='contain'
								style={styles.bola}
								source={require('../../../assets/public/bola.png')}
							/>
							<Image
								resizeMode='contain'
								style={styles.logo}
								source={require('../../../assets/public/LogoRecicla.png')}
							/>
						</View>
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
							</View>
							<View style={{ width: '100%', marginBottom: 50 }}>
								<Text style={[styles.title, { fontSize: 17 }]}>Crie sua conta</Text>
							</View>
							<View style={[styles.elementContainer, { marginBottom: 28 }]}>
								<TextInput
									placeholder='Digite seu e-mail'
									value={email}
									onChangeText={(text: string) => setEmail(text)}
									style={{
										width: '100%',
										height: 50,
										backgroundColor: '#EEEEEE',
										borderRadius: 16,
										paddingHorizontal: 21,
									}}
								/>
								<ErrorMessage isActive={errors.emptyEmail}>
									O campo de e-mail não pode estar em branco!
								</ErrorMessage>
								<ErrorMessage isActive={errors.invalidEmail}>
									Endereço de e-mail inválido!
								</ErrorMessage>
							</View>

							<View style={[styles.elementContainer, { marginBottom: 12 }]}>
								<TextInput
									placeholder='Digite sua senha'
									secureTextEntry
									value={password}
									onChangeText={(text: string) => setPassword(text)}
									style={{
										width: '100%',
										height: 50,
										backgroundColor: '#EEEEEE',
										borderRadius: 16,
										paddingHorizontal: 21,
									}}
								/>
								<ErrorMessage isActive={errors.emptyPassword}>
									O campo de senha não pode estar em branco!
								</ErrorMessage>
								<ErrorMessage isActive={errors.shortPassword}>
									A senha deve possui ao menos 6 caracteres!
								</ErrorMessage>
								<ErrorMessage isActive={errors.emailUnavaiable}>
									O endereço de e-mail já está cadastrado!
								</ErrorMessage>
							</View>
							<CustomButton
								style={{ marginBottom: 66 }}
								title='Esqueci minha senha'
								onPress={() => console.log('oi')}
								textStyle={{ color: '#1a6dbb' }}
							/>

							<View style={[styles.container, { marginBottom: 32 }]}>
								<PrimaryButton
									isLoading={isAuthenticating}
									title='Cadastrar'
									onPress={signUpHandler}
								/>
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
					</LinearGradient>
				</ScrollView>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
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
	elementContainer: {
		width: '100%',
	},
	errorMessage: {
		color: '#ff2525',
		fontSize: 11,
		marginLeft: 5,
	},
	invisible: {
		width: 0,
		height: 0,
	},
	imageContainer: {
		width: '100%',
		marginBottom: 80,
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	logo: {
		height: 82,
		width: 210,
		marginRight: 20,
		marginTop: 20,
	},
	bola: {
		height: 145,
		width: 220,
		position: 'absolute',
		top: -2,
		left: -2,
	},
})
