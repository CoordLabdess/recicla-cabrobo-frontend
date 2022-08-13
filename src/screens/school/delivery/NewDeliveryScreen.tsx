import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native'
import { SimplePageHeader } from '../../../components/ui/SimplePageHeader'
import { COLORS } from '../../../constants/colors'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export function NewDeliveryScreen() {
	const navigation = useNavigation()

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
				<SimplePageHeader
					title='Escolher Tipo da Entrega'
					dontShowGoBack
					textStyle={styles.title}
				/>
				<View style={styles.outterContainer}>
					<Pressable
						android_ripple={{ color: '#ccc' }}
						style={styles.innerContainer}
						onPress={() => {
							navigation.navigate('DeliveryInformTurboTask' as never, { mode: 'create' } as never)
						}}
					>
						<Ionicons name='rocket-outline' size={60} color={COLORS.primary500} />
						<Text style={styles.cardTitle}>Atividade Turbinada</Text>
					</Pressable>
				</View>
				<View style={styles.outterContainer}>
					<Pressable
						android_ripple={{ color: '#ccc' }}
						style={styles.innerContainer}
						onPress={() => {
							navigation.navigate('Delivery1' as never)
						}}
					>
						<Ionicons name='leaf-outline' size={60} color={COLORS.primary500} />
						<Text style={styles.cardTitle}>Entrega de Materiais</Text>
					</Pressable>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: '#fff',
	},
	outterContainer: {
		borderWidth: 2,
		borderRadius: 20,
		marginBottom: 50,
		height: 130,
		width: 200,
		overflow: 'hidden',
		borderColor: COLORS.primary500,
	},
	innerContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 10,
	},
	title: {
		fontSize: 20,
		color: COLORS.primary500,
		fontWeight: '600',
	},
	cardTitle: {
		fontSize: 19,
		fontWeight: '600',
		color: COLORS.primary500,
		textAlign: 'center',
	},
})
