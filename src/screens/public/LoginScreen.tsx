import { useLinkProps } from '@react-navigation/native'
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CustomButton, PrimaryButton } from '../../components/ui/Buttons'
import { COLORS } from '../../constants/colors'
import { PrimaryTextInput } from '../../components/ui/TextInputs'

interface LoginScreenProps {
	isLogged: boolean
	setIsLogged: React.Dispatch<React.SetStateAction<boolean>>
}

export function LoginScreen(props: LoginScreenProps) {
	function login() {
		props.setIsLogged(true)
	}
	return (
		<SafeAreaView style={styles.root}>
			<View>
				<ScrollView style={{ flexGrow: 1 }}>
					<View
						style={{
							width: '80%',
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
							style={{ width: '100%', height: 50, marginBottom: 28 }}
						/>

						<PrimaryTextInput
							placeholder='Digite sua senha'
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
							onPress={login}
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
							<Text>Não tem uma conta?</Text>
							<CustomButton
								title='Cadastre-se'
								onPress={() => console.log('oi')}
								textStyle={{ color: '#00E0FF' }}
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
