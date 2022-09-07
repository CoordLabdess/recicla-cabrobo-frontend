import { RouteProp } from '@react-navigation/native'
import { useState } from 'react'
import { View, Text, ScrollView, StyleSheet, TextInput } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PrimaryButton } from '../../../components/ui/Buttons'
import { ConfirmModal } from '../../../components/ui/ConfirmModal'
import { ProfileImage } from '../../../components/ui/ProfileImage'
import { SimplePageHeader } from '../../../components/ui/SimplePageHeader'
import { COLORS } from '../../../constants/colors'
import { useNavigation } from '@react-navigation/native'
import { Award } from '../../../data/awards'

interface EditAwardScreenProps {
	route: RouteProp<{ params: { mode: 'create' | 'edit'; award: Award } }, 'params'>
}

const emptyAward: Award = {
	id: '0',
	nome: '',
	preco: '0',
}

export function EditAwardScreen(props: EditAwardScreenProps) {
	const navigation = useNavigation()
	const [editable, setEditable] = useState(props.route.params.mode === 'create')

	const award = props.route.params.mode === 'create' ? emptyAward : props.route.params.award
	const [title, setTitle] = useState(award.nome)
	const [awardPrice, setAwardPrice] = useState(award.preco)
	const [confirmModal, setConfirmModal] = useState<'off' | 'save' | 'exclude' | 'create'>('off')
	const [isLoading, setIsLoading] = useState(false)

	async function fakeFetching() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve('')
			}, 1000)
		})
	}

	function sendChanges() {
		setIsLoading(true)
		fakeFetching()
			.then(response => {
				setIsLoading(false)
				navigation.navigate('Award0' as never)
			})
			.catch(error => {
				setIsLoading(false)
			})
	}

	return (
		<SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
			<ScrollView
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
					title={props.route.params.mode === 'create' ? 'Adicionar Novo Prêmio' : 'Editar Prêmio'}
				/>

				<View style={styles.fieldContainer}>
					<Text style={styles.label}>Prêmio</Text>
					<TextInput
						style={styles.field}
						value={title}
						onChangeText={text => setTitle(text)}
						editable={editable}
					/>
				</View>

				<View style={styles.fieldContainer}>
					<Text style={styles.label}>{'Custo (pts)'}</Text>
					<TextInput
						style={styles.field}
						value={String(awardPrice)}
						onChangeText={text => setAwardPrice(text)}
						editable={editable}
					/>
				</View>

				{/*<View style={styles.fieldContainer}>
					<Text style={styles.label}>Série</Text>
					<TextInput
						style={styles.field}
						value={serie}
						onChangeText={text => setSerie(text)}
						editable={editable}
					/>
				</View>*/}
			</ScrollView>

			{props.route.params.mode === 'create' ? (
				<View style={{ alignItems: 'center', paddingTop: 15, paddingBottom: 20 }}>
					<PrimaryButton title='Cadastrar' onPress={() => setConfirmModal('create')} />
				</View>
			) : !editable ? (
				<View style={{ alignItems: 'center', paddingTop: 15, paddingBottom: 20 }}>
					<PrimaryButton title='Editar Prêmio' onPress={() => setEditable(true)} />
				</View>
			) : (
				<View
					style={{
						alignItems: 'center',
						flexDirection: 'row',
						justifyContent: 'space-around',
						paddingTop: 15,
						paddingBottom: 20,
					}}
				>
					<PrimaryButton title='Salvar' onPress={() => setConfirmModal('save')} />
					<PrimaryButton
						title='Excluir'
						innerContainerStyle={{ backgroundColor: '#8E2941' }}
						onPress={() => setConfirmModal('exclude')}
					/>
				</View>
			)}
			<ConfirmModal
				visible={confirmModal === 'save'}
				title='Salvar alterações?'
				isLoading={isLoading}
				text='As alterações serão salvas no sistema.'
				onCancel={() => setConfirmModal('off')}
				onConfirm={sendChanges}
			/>
			<ConfirmModal
				visible={confirmModal === 'exclude'}
				title='Você tem certeza?'
				isLoading={isLoading}
				text='Ao confirmar, o prêmio será removido do sistema.'
				onCancel={() => setConfirmModal('off')}
				onConfirm={sendChanges}
			/>
			<ConfirmModal
				visible={confirmModal === 'create'}
				title='Cadastrar Aluno?'
				isLoading={isLoading}
				text='Confirmar novo prêmio?'
				onCancel={() => setConfirmModal('off')}
				onConfirm={sendChanges}
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
		fontSize: 19,
		fontWeight: '600',
		padding: 11,
		borderRadius: 15,
		backgroundColor: COLORS.secondary400,
	},
})
