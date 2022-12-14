import { View, Text, StyleSheet, ScrollView, TextInput, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CustomButton, PrimaryButton } from '../../components/ui/Buttons'
import { COLORS } from '../../constants/colors'
import { LinearGradient } from 'expo-linear-gradient'
import { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { AuthContext } from '../../store/context/authContext'
import { useNavigation } from '@react-navigation/native'
import { signIn } from '../../utils/auth'
import { isEmailValid } from '../../utils/verification'
import { ErrorMessage } from '../../components/ui/ErrorMessage'
import { PrivacyPolicyModal } from '../../components/modals/PrivacyPolicyModal'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface Erros {
	invalidEmail: boolean
	shortPassword: boolean
	emptyEmail: boolean
	emptyPassword: boolean
	emailOrPasswordWrong: boolean
}

export function LoginScreen() {
	const [isAuthenticating, setIsAuthenticating] = useState(false)
	const [acceptedPolicy, setAcceptedPolicy] = useState(true)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [viewModal, setViewModal] = useState(false)
	const navigation = useNavigation()
	const [errors, setErros] = useState<Erros>({
		invalidEmail: false,
		shortPassword: false,
		emptyEmail: false,
		emptyPassword: false,
		emailOrPasswordWrong: false,
	})

	async function storeData(key: string, value: string) {
		try {
			await AsyncStorage.setItem(key, value)
		} catch (e) {
			console.log(e)
		}
	}

	async function getData(key: string) {
		try {
			const value = await AsyncStorage.getItem(key)
			setAcceptedPolicy(value === 'true')
			if (value) {
				return value
			}
			return ''
		} catch (e) {
			return ''
		}
	}

	function checkA(key: string) {
		getData('hasAcceptedPolicy').then(value => {
			setAcceptedPolicy(value === 'true')
		})
	}

	useLayoutEffect(() => {
		// storeData('hasAcceptedPolicy', 'false')
		checkA('hasAcceptedPolicy')
	}, [])

	function validateData() {
		let isDataValid = true
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
			await signIn(email.trim(), password.trim())
				.then(({ token, type }) => {
					authCtx.authenticate(token, type)
				})
				.catch(error => {
					setErros(cErros => {
						return { ...cErros, emailOrPasswordWrong: true }
					})
					setIsAuthenticating(false)
				})
		} else {
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
								<Text style={[styles.title, { fontSize: 17 }]}>Fa??a login para continuar</Text>
							</View>

							<View style={[styles.elementContainer, { marginBottom: 28 }]}>
								<TextInput
									placeholder='N??mero de Matr??cula'
									returnKeyType='next'
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
									CPF ou Matr??cula em branco!
								</ErrorMessage>
								<ErrorMessage isActive={errors.invalidEmail}>
									Digite apenas n??meros. Ex: 123456
								</ErrorMessage>
							</View>

							<View style={[styles.elementContainer, { marginBottom: 12 }]}>
								<TextInput
									placeholder='Senha'
									returnKeyType='go'
									secureTextEntry
									onSubmitEditing={signInHandler}
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
									O campo de senha n??o pode estar em branco!
								</ErrorMessage>
								<ErrorMessage isActive={errors.emailOrPasswordWrong}>
									E-mail ou senha incorretos!
								</ErrorMessage>
							</View>

							{/* <CustomButton
								style={{ marginBottom: 66 }}
								title='Esqueci minha senha'
								onPress={() => console.log('oi')}
								textStyle={{ color: '#1a6dbb' }}
							/> */}
							<View style={[styles.elementContainer, { marginTop: 32, alignItems: 'center' }]}>
								<PrimaryButton
									isLoading={isAuthenticating}
									title='Acessar'
									innerContainerStyle={{ paddingHorizontal: 60 }}
									onPress={signInHandler}
								/>
							</View>
							<View style={[styles.elementContainer, { marginTop: 32, alignItems: 'center' }]}>
								<CustomButton
									style={{ marginBottom: 66 }}
									title='Ver pol??tica de privadidade'
									onPress={() => {
										if (acceptedPolicy) {
											setViewModal(true)
										}
									}}
									textStyle={{ color: '#1a6dbb' }}
								/>
							</View>
							{/* <View style={[styles.registerContainer, { marginBottom: 34 }]}>
								<Text>N??o tem uma conta? </Text>
								<CustomButton
									title='Cadastre-se'
									onPress={() => navigation.navigate('SignUp' as any)}
									textStyle={{ color: '#1a6dbb' }}
								/>
							</View> */}
						</View>
					</LinearGradient>
				</ScrollView>
			</View>
			<PrivacyPolicyModal
				visible={!acceptedPolicy || viewModal}
				confirm={!viewModal}
				onCancel={() => {}}
				onConfirm={() => {
					storeData('hasAcceptedPolicy', 'true')
					checkA('hasAcceptedPolicy')
					setViewModal(false)
				}}
			/>
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
