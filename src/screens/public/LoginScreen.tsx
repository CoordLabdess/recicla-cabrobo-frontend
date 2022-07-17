import { View, Text, Button, StyleSheet, ScrollView, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CustomButton, PrimaryButton } from '../../components/ui/Buttons'
import { COLORS } from '../../constants/colors'
import { PrimaryTextInput } from '../../components/ui/TextInputs'
import { LinearGradient } from 'expo-linear-gradient'
import { useContext, useState } from 'react'
import { AuthContext } from '../../store/context/authContext'
import { useNavigation } from '@react-navigation/native'
import { signIn } from '../../utils/auth'

export function LoginScreen() {
	const [isAuthenticating, setIsAuthenticating] = useState(false)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const navigation = useNavigation()

	async function signInHandler() {
		setIsAuthenticating(true)
		try {
			const token = await signIn(email, password)
			authCtx.authenticate(token)
		} catch (error) {
			Alert.alert('Erro de autenticação!', 'Configura suas credenciais e tente novamente.')
			setIsAuthenticating(false)
		}
	}

	const authCtx = useContext(AuthContext)

	if (isAuthenticating) {
		return (
			<SafeAreaView>
				<Text>Loading</Text>
			</SafeAreaView>
		)
	} else {
		return (
			<SafeAreaView style={styles.root}>
				<View>
					<ScrollView style={{ flexGrow: 1 }}>
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

							<PrimaryTextInput
								placeholder='Digite seu e-mail'
								value={email}
								onChangeText={(text: string) => setEmail(text)}
								style={{ width: '100%', height: 50, marginBottom: 28 }}
							/>

							<PrimaryTextInput
								placeholder='Digite sua senha'
								secureTextEntry
								value={password}
								onChangeText={(text: string) => setPassword(text)}
								style={{ width: '100%', height: 50, marginBottom: 12 }}
							/>

							<CustomButton
								style={{ marginBottom: 66 }}
								title='Esqueci minha senha'
								onPress={() => console.log('oi')}
								textStyle={{ color: '#00E0FF' }}
							/>

							<CustomButton
								title='Login'
								onPress={signInHandler}
								style={{
									marginBottom: 32,
									backgroundColor: COLORS.primary500,
									height: 57,
									width: '65%',
									borderRadius: 50,
									alignItems: 'center',
									justifyContent: 'center',
								}}
								textStyle={{
									color: '#fff',
									fontWeight: '600',
									fontSize: 25,
								}}
							/>

							<View style={[styles.registerContainer, { marginBottom: 34 }]}>
								<Text>Não tem uma conta? </Text>
								<CustomButton
									title='Cadastre-se'
									onPress={() => navigation.navigate('SignUp' as any)}
									textStyle={{ color: '#00E0FF' }}
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
