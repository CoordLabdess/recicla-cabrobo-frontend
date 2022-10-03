import { View, Text, StyleSheet, FlatList, Modal } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SimplePageHeader } from '../../../components/ui/SimplePageHeader'
import { COLORS } from '../../../constants/colors'
import { Ionicons } from '@expo/vector-icons'
import { AwardListItem } from '../../../components/awards/AwardListItem'
import { RouteProp, useNavigation } from '@react-navigation/native'
import { useContext, useLayoutEffect, useState } from 'react'
import { ConfirmAwardModal } from '../../../components/awards/ConfirmAwardModal'
import { Student } from '../../../data/students'
import { RoundIconButton } from '../../../components/ui/RoundIconButton'
import { Award, getAwardList, StudentData } from '../../../utils/student'
import { listarPremios, resgatarPremio } from '../../../utils/school'
import { AuthContext } from '../../../store/context/authContext'
import { LoadingScreen } from '../../ui/LoadingScreen'

interface ChooseAwardScreenProps {
	route: RouteProp<{ params: { student: StudentData; mode: 'get' | 'manage' } }, 'params'>
}

export function ChooseAwardScreen(props: ChooseAwardScreenProps) {
	const navigation = useNavigation()
	const student = props.route.params.student
	const [confirmModal, setConfirmModal] = useState(false)
	const [award, setAward] = useState<Award | null>(null)
	const [premios, setPremios] = useState<Award[] | null>(null)
	const authCtx = useContext(AuthContext)
	const [isLoading, setIsLoading] = useState(false)

	async function fakeFetching() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve('')
			}, 1000)
		})
	}

	async function sendChanges(premioId: string) {
		if (!isLoading) {
			setIsLoading(true)
			console.log(premioId)
			resgatarPremio(authCtx.token || '', String(student.matricula), premioId)
				.then(() => {
					navigation.navigate('Award1' as never)
					setIsLoading(false)
					setConfirmModal(false)
				})
				.catch(() => {
					setConfirmModal(false)
					setIsLoading(false)
				})
		}
	}

	useLayoutEffect(() => {
		getAwardList(authCtx.token || '').then(res => setPremios(res))
	}, [])

	if (!premios) {
		return <LoadingScreen />
	}

	return (
		<SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
			<FlatList
				ListHeaderComponent={() => (
					<SimplePageHeader textStyle={styles.title} title='Selecione o Prêmio' />
				)}
				keyboardShouldPersistTaps='handled'
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: 'flex-start',
					paddingHorizontal: '5%',
					alignItems: 'center',
					paddingBottom: 20,
				}}
				alwaysBounceVertical={false}
				showsVerticalScrollIndicator={false}
				data={premios}
				renderItem={itemData => (
					<AwardListItem
						award={itemData.item}
						onPress={() => {
							if (props.route.params.mode === 'manage') {
								navigation.navigate(
									'EditAward' as never,
									{ mode: 'Edit', award: itemData.item } as never,
								)
							} else {
								setAward(itemData.item)
								setConfirmModal(true)
							}
						}}
					/>
				)}
			/>
			{props.route.params.mode !== 'get' && (
				<View style={{ position: 'absolute', bottom: 20, right: 20 }}>
					<RoundIconButton
						iconColor={COLORS.secondary100}
						iconName={'add'}
						size={52}
						onPress={() => {
							navigation.navigate('EditAward' as never, { mode: 'create' } as never)
						}}
					/>
				</View>
			)}

			{props.route.params.mode === 'get' && award && (
				<ConfirmAwardModal
					award={award}
					visible={confirmModal}
					isLoading={isLoading}
					onCancel={() => setConfirmModal(false)}
					onConfirm={sendChanges}
					student={props.route.params.student}
				/>
			)}
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: '#fff',
	},
	title: {
		fontSize: 20,
		color: COLORS.primary500,
		fontWeight: '600',
	},
})
