import {
	View,
	Text,
	Button,
	StyleSheet,
	ScrollView,
	Alert,
	TextInput,
	ActivityIndicator,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CustomButton, PrimaryButton } from '../../components/ui/Buttons'
import { COLORS } from '../../constants/colors'
import { PrimaryTextInput } from '../../components/ui/TextInputs'
import { LinearGradient } from 'expo-linear-gradient'
import { useContext, useState } from 'react'
import { AuthContext } from '../../store/context/authContext'
import { useNavigation } from '@react-navigation/native'
import { signIn } from '../../utils/auth'
import { LoadingScreen } from '../ui/LoadingScreen'
import { isEmailValid, isPasswordLong } from '../../utils/verification'

interface Erros {
	invalidEmail: boolean
	shortPassword: boolean
	emptyEmail: boolean
	emptyPassword: boolean
	emailOrPasswordWrong: boolean
}

function loading(props: { color: string; size: number }) {
	return <ActivityIndicator color={props.color} size={props.size} />
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

	async function signInHandler() {
		if (validateData()) {
			setIsAuthenticating(true)
			try {
				const token = await signIn(email, password)
				authCtx.authenticate(token)
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
						</View>
						<View style={{ width: '100%', marginBottom: 50 }}>
							<Text style={[styles.title, { fontSize: 17 }]}>Faça login para continuar</Text>
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
							<Text style={errors.emptyEmail ? styles.errorMessage : styles.invisible}>
								O campo de e-mail não pode estar em branco!
							</Text>
							<Text style={errors.invalidEmail ? styles.errorMessage : styles.invisible}>
								Endereço de e-mail inválido!
							</Text>
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
							<Text style={errors.emptyPassword ? styles.errorMessage : styles.invisible}>
								O campo de senha não pode estar em branco!
							</Text>
							<Text style={errors.emailOrPasswordWrong ? styles.errorMessage : styles.invisible}>
								E-mail ou senha incorretos!
							</Text>
						</View>

						<CustomButton
							style={{ marginBottom: 66 }}
							title='Esqueci minha senha'
							onPress={() => console.log('oi')}
							textStyle={{ color: '#1a6dbb' }}
						/>
						<View style={[styles.elementContainer, { marginBottom: 32, alignItems: 'center' }]}>
							<PrimaryButton isLoading={isAuthenticating} title='Acessar' onPress={signInHandler} />
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
				</ScrollView>
			</View>
		</SafeAreaView>
	)
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
})
