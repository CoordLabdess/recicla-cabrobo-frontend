import { View, Text, ScrollView, FlatList, StyleSheet } from 'react-native'
import { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TurboTaskClasssListItem } from '../../../components/turboTasks/TurboTaskClasssListItem'
import { RoundIconButton } from '../../../components/ui/RoundIconButton'
import { SimplePageHeader } from '../../../components/ui/SimplePageHeader'
import { turboTasks } from '../../../data/turboTasks'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { COLORS } from '../../../constants/colors'
import { useLayoutEffect } from 'react'
import { listarAtividades } from '../../../utils/school'
import { AuthContext } from '../../../store/context/authContext'
import { LoadingScreen } from '../../ui/LoadingScreen'
import { AtividadeDataOutput } from '../../../types/atividades.type'
import { listarAtividadesDoAluno } from '../../../utils/student'
import { StudentTurboTaskListItem } from '../../../components/turboTasks/StudentTurboTaskListItem'
import { StudentContext } from '../../../store/context/studentContext'

export function PontuacaoTurbinadaScreen() {
	const authCtx = useContext(AuthContext)
	const navigation = useNavigation()
	const isFocused = useIsFocused()
	const studentCtx = useContext(StudentContext)

	const [atividades, setAtividades] = useState<AtividadeDataOutput[] | null>(null)

	useLayoutEffect(() => {
		listarAtividadesDoAluno(authCtx.token || '')
			.then(res => {
				setAtividades(
					res
						.filter(
							s =>
								s.status !== 'Inativo' &&
								(s.serie === studentCtx.studentData.serie ||
									s.serie === 'Multiserie' ||
									s.serie === ''),
						)
						.sort((a, b) => (a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0)),
				)
			})
			.catch(err => {
				console.log(err)
			})
	}, [isFocused])

	if (!atividades) {
		return <LoadingScreen />
	}

	return (
		<SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
			<FlatList
				ListHeaderComponent={() => (
					<SimplePageHeader textStyle={styles.title} title='Atividades Turbinadas' />
				)}
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: 'flex-start',
					paddingHorizontal: '5%',
					alignItems: 'center',
				}}
				alwaysBounceVertical={false}
				showsVerticalScrollIndicator={false}
				data={atividades}
				renderItem={itemData => <StudentTurboTaskListItem turboTask={itemData.item} />}
			/>
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
