import { Picker } from '@react-native-picker/picker'
import { useState } from 'react'
import { Text, View, ScrollView, StyleSheet, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PrimaryButton } from '../../../components/ui/Buttons'
import { ConfirmModal } from '../../../components/ui/ConfirmModal'
import { SimplePageHeader } from '../../../components/ui/SimplePageHeader'
import { COLORS } from '../../../constants/colors'
import { TurboTask, turboTasks } from '../../../data/turboTasks'
import { useNavigation } from '@react-navigation/native'

export function InformTurboTaskScreen() {
	const navigation = useNavigation()
	const [selectedTurboTask, setSelectedTurboTask] = useState<TurboTask | null>(null)
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	async function fakeFetching() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve('')
			}, 1000)
		})
	}

	async function sendChanges() {
		setIsLoading(true)
		await fakeFetching()
			.then(response => {
				setIsLoading(false)
				navigation.navigate('Delivery0' as never)
			})
			.catch(error => {
				setIsLoading(false)
			})
	}

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
				<SimplePageHeader title='Informe a Atividade' textStyle={styles.title} />
				<View style={styles.fieldContainer}>
					<Text style={styles.label}>Atividade</Text>
					<View style={{ overflow: 'hidden', borderRadius: 15, width: '100%' }}>
						<Picker
							onValueChange={text =>
								setSelectedTurboTask(turboTasks.filter(task => task.id === Number(text))[0])
							}
							style={[styles.field, { fontSize: 20, fontWeight: '600' }]}
							selectedValue={selectedTurboTask?.id || ''}
							enabled={true}
						>
							<Picker.Item label='- Selecione a atividade -' value='' />
							{turboTasks.map(item => {
								return (
									<Picker.Item
										key={item.id}
										label={`${item.title} - ${item.class}`}
										value={item.id}
									/>
								)
							})}
						</Picker>
					</View>
				</View>
				<View style={{ marginVertical: 20 }}>
					<Text style={styles.title}>Detalhes da Atividade</Text>
				</View>
				<View style={styles.fieldContainer}>
					<Text style={styles.label}>Descrição da Atividade</Text>
					<Text numberOfLines={10} style={[styles.field, { color: COLORS.secondary600 }]}>
						{selectedTurboTask?.description}
					</Text>
				</View>
				<View style={styles.fieldContainer}>
					<Text style={styles.label}>Pontuação</Text>
					<Text style={[styles.field, { color: COLORS.secondary600 }]}>
						{selectedTurboTask?.points}
					</Text>
				</View>
				<View style={{ marginTop: 50 }}>
					<PrimaryButton
						avoidClick={selectedTurboTask ? false : true}
						title='Registrar Entrega'
						onPress={() => setIsModalVisible(true)}
					/>
				</View>
			</ScrollView>
			<ConfirmModal
				title='Confirmar Entrega'
				visible={isModalVisible}
				isLoading={isLoading}
				onCancel={() => setIsModalVisible(false)}
				onConfirm={sendChanges}
				text='A atividade será registrada no histórico do aluno como entregue e o mesmo receberá a pontuação atribuída.'
			/>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: '#fff',
	},
	fieldContainer: {
		width: '100%',
		marginBottom: 18,
	},
	label: {
		fontSize: 19,
		fontWeight: '600',
		marginBottom: 5,
	},
	field: {
		fontSize: 15,
		padding: 11,
		borderRadius: 15,
		backgroundColor: COLORS.secondary400,
	},
	title: {
		fontSize: 20,
		color: COLORS.primary500,
		fontWeight: '600',
	},
})
