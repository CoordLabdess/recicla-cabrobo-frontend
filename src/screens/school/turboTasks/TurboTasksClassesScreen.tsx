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

export function TurboTasksClassesScreen() {
	const authCtx = useContext(AuthContext)
	const navigation = useNavigation()
	const isFocused = useIsFocused()

	const [atividades, setAtividades] = useState<AtividadeDataOutput[] | null>(null)

	useLayoutEffect(() => {
		listarAtividades(authCtx.token || '')
			.then(res => {
				setAtividades(
					res
						.filter(s => s.status !== 'Inativo')
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
				renderItem={itemData => <TurboTaskClasssListItem turboTask={itemData.item} />}
			/>
			<View
				style={{ position: 'absolute', bottom: 0, right: 0, marginRight: 25, marginBottom: 25 }}
			>
				<RoundIconButton size={52} onPress={() => navigation.navigate('CriarAtividade' as never)} />
			</View>
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
