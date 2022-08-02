import { View, Text, StyleSheet, ScrollView, TextInput, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CustomButton, PrimaryButton } from '../../components/ui/Buttons'
import { COLORS } from '../../constants/colors'
import { LinearGradient } from 'expo-linear-gradient'
import { useContext, useState } from 'react'
import { AuthContext } from '../../store/context/authContext'
import { useNavigation } from '@react-navigation/native'
import { signIn } from '../../utils/auth'
import { isEmailValid } from '../../utils/verification'
import { ErrorMessage } from '../../components/ui/ErrorMessage'

interface Erros {
	invalidEmail: boolean
	shortPassword: boolean
	emptyEmail: boolean
	emptyPassword: boolean
	emailOrPasswordWrong: boolean
}

export function LoginScreen() {
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

	function validateData() {
		let isDataValid = true
		/*if (!isEmailValid(email)) {
			setErros(cErros => {
				return { ...cErros, invalidEmail: true }
			})
			isDataValid = false
		} else {
			setErros(cErros => {
				return { ...cErros, invalidEmail: false }
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
		}*/
		if (!email.match(/^[0-9]+$/)) {
			setErros(cErros => {
				return { ...cErros, invalidEmail: true }
			})
			isDataValid = false
		} else {
			setErros(cErros => {
				return { ...cErros, invalidEmail: false }
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

	async function signInHandler() {
		if (validateData()) {
			setIsAuthenticating(true)
			try {
				//const { token, type } = await signIn(email.split(/(?:,| |-|\.)+/).join(''), password)
				authCtx.authenticate('a', 'Student')
			} catch (error) {
				setErros(cErros => {
					return { ...cErros, emailOrPasswordWrong: true }
				})
				setIsAuthenticating(false)
			}
		} else {
			console.log('Informações incorretas')
		}
	}

	const authCtx = useContext(AuthContext)

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
								<Text style={[styles.title, { fontSize: 17 }]}>Faça login para continuar</Text>
							</View>

							<View style={[styles.elementContainer, { marginBottom: 28 }]}>
								<TextInput
									placeholder='Digite seu Nº de matrícula ou CPF'
									keyboardType='number-pad'
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
									Digite apenas números. Ex: 123456
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
								<ErrorMessage isActive={errors.emailOrPasswordWrong}>
									E-mail ou senha incorretos!
								</ErrorMessage>
							</View>

							<CustomButton
								style={{ marginBottom: 66 }}
								title='Esqueci minha senha'
								onPress={() => console.log('oi')}
								textStyle={{ color: '#1a6dbb' }}
							/>
							<View style={[styles.elementContainer, { marginBottom: 32, alignItems: 'center' }]}>
								<PrimaryButton
									isLoading={isAuthenticating}
									title='Acessar'
									innerContainerStyle={{ paddingHorizontal: 60 }}
									onPress={signInHandler}
								/>
							</View>
							<View style={[styles.registerContainer, { marginBottom: 34 }]}>
								<Text>Não tem uma conta? </Text>
								<CustomButton
									title='Cadastre-se'
									onPress={() => navigation.navigate('SignUp' as any)}
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
	elementContainer: {
		width: '100%',
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
