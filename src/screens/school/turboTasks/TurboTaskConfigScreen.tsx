import { RouteProp } from '@react-navigation/native'
import React, { useState } from 'react'
import {
	View,
	Text,
	StyleSheet,
	_ScrollView,
	ScrollView,
	TextInput,
	Button,
	Pressable,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SimplePageHeader } from '../../../components/ui/SimplePageHeader'
import { COLORS } from '../../../constants/colors'
import { TurboTask, turboTasks } from '../../../data/turboTasks'
import { Picker } from '@react-native-picker/picker'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { PrimaryButton } from '../../../components/ui/Buttons'
import { useNavigation } from '@react-navigation/native'

interface TurboTaskConfigScreenProps {
	route: RouteProp<{ params: { mode: 'create' | 'edit'; turboTaskId: number } }, 'params'>
}

const emptyTurboTask: TurboTask = {
	active: false,
	deadline: new Date(),
	description: '',
	id: 0,
	points: 0,
	class: '',
	title: '',
}

export function TurboTaskConfigScreen(props: TurboTaskConfigScreenProps) {
	const navigation = useNavigation()
	const [date, setDate] = useState(new Date())
	const [show, setShow] = useState(false)
	const [turboTask, setTurboTask] = useState<TurboTask>(
		props.route.params.mode === 'edit'
			? getTurboTaskById(props.route.params.turboTaskId)
			: emptyTurboTask,
	)
	const [isLoading, setIsLoading] = useState(false)

	function getTurboTaskById(id: number) {
		return turboTasks.filter(tTask => tTask.id === id)[0]
	}

	function onChangeDate(event: DateTimePickerEvent, currentDate?: Date) {
		const d = currentDate || date
		setShow(false)
		setDate(d)
	}

	function formatDate(d: Date) {
		return (
			d.getDate().toString().padStart(2, '0') +
			'/' +
			(d.getMonth() + 1).toString().padStart(2, '0') +
			'/' +
			d.getFullYear().toString()
		)
	}

	async function fakePromise() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve('')
			}, 1000)
		})
	}

	async function updateTurboTask() {
		setIsLoading(true)
		await fakePromise()
			.then(() => {
				setIsLoading(false)
				navigation.navigate('TurboTasks' as never)
			})
			.catch(() => {
				setIsLoading(false)
			})
	}

	return (
		<SafeAreaView style={styles.root}>
			<ScrollView
				keyboardShouldPersistTaps='always'
				contentContainerStyle={{
					flexGrow: 1,
					paddingBottom: 20,
					justifyContent: 'flex-start',
					paddingHorizontal: '5%',
					alignItems: 'center',
				}}
				alwaysBounceVertical={false}
				showsVerticalScrollIndicator={false}
			>
				<SimplePageHeader
					title={props.route.params.mode === 'create' ? 'Criar Atividade' : 'Editar Atividade'}
				/>
				<View style={styles.elementContainer}>
					<Text style={styles.label}>Título</Text>
					<TextInput
						onChangeText={text => {
							setTurboTask({ ...turboTask, title: text })
						}}
						style={styles.textInput}
						value={turboTask.title}
					/>
				</View>
				<View style={styles.elementContainer}>
					<Text style={styles.label}>Descrição</Text>
					<TextInput
						onChangeText={text => {
							setTurboTask({ ...turboTask, description: text })
						}}
						style={styles.textInput}
						numberOfLines={4}
						textAlignVertical={'top'}
						multiline
						value={turboTask.description}
					/>
				</View>

				<View style={styles.elementContainer}>
					<Text style={styles.label}>Série</Text>
					<View style={{ overflow: 'hidden', borderRadius: 15 }}>
						<Picker
							style={[styles.textInput, { fontSize: 20, fontWeight: '600' }]}
							selectedValue={turboTask.class}
							onValueChange={value => {
								setTurboTask({ ...turboTask, class: value })
							}}
							enabled={true}
						>
							<Picker.Item label='- Selecione uma turma -' value='' />
							<Picker.Item label='4º ano' value='4º ano' />
							<Picker.Item label='5º ano' value='5º ano' />
							<Picker.Item label='6º ano' value='6º ano' />
							<Picker.Item label='7º ano' value='7º ano' />
							<Picker.Item label='8º ano' value='8º ano' />
							<Picker.Item label='9º ano' value='9º ano' />
							<Picker.Item label='1º médio' value='1º médio' />
							<Picker.Item label='2º médio' value='2º médio' />
							<Picker.Item label='3º médio' value='3º médio' />
						</Picker>
					</View>
				</View>
				<View style={styles.elementContainer}>
					<Text style={styles.label}>Pontuação</Text>
					<View style={{ width: '100%', alignItems: 'center' }}>
						<View style={{ borderBottomWidth: 2, borderColor: COLORS.secondary500 }}>
							<TextInput
								keyboardType='number-pad'
								style={styles.points}
								onChangeText={text => {
									setTurboTask({ ...turboTask, points: Number(text) })
								}}
								value={turboTask.points.toString()}
							/>
						</View>
					</View>
				</View>
				<View style={styles.elementContainer}>
					<Text style={styles.label}>Data limite</Text>
					<View style={{ width: '100%', alignItems: 'center' }}>
						<Pressable
							style={{ borderBottomWidth: 2, borderColor: COLORS.secondary500 }}
							onPress={() => setShow(true)}
						>
							<Text style={styles.points}>{formatDate(date)}</Text>
						</Pressable>
					</View>
					{show && <DateTimePicker value={date} onChange={onChangeDate} />}
				</View>
				<View style={{ marginTop: 20 }}>
					<PrimaryButton title='Salvar Atividade' isLoading={isLoading} onPress={updateTurboTask} />
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
	elementContainer: {
		width: '100%',
		marginBottom: 20,
	},
	label: {
		fontSize: 19,
		fontWeight: '600',
		marginBottom: 6,
	},
	textInput: {
		backgroundColor: COLORS.secondary400,
		fontSize: 14,
		paddingVertical: 9,
		paddingHorizontal: 17,
		borderRadius: 16,
	},
	points: {
		textAlign: 'center',
		fontSize: 40,
		color: COLORS.secondary500,
	},
})
