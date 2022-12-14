import { useContext, useLayoutEffect } from 'react'
import { View, Text, FlatList, StyleSheet, ScrollView, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NotificationCard } from '../../../components/home/NotificationCard'
import { PrimaryButton } from '../../../components/ui/Buttons'
import { COLORS } from '../../../constants/colors'
import { AuthContext } from '../../../store/context/authContext'
import { Ionicons } from '@expo/vector-icons'
import { SchoolHomeListItem } from '../../../components/home/SchoolHomeListItem'
import { useNavigation } from '@react-navigation/native'
import { SchoolContext } from '../../../store/context/schoolContext'
import { getSchoolPointsById } from '../../../utils/school'

export function SchoolHomeScreen() {
	const navigation = useNavigation()
	const authCtx = useContext(AuthContext)
	const schoolCtx = useContext(SchoolContext)

	useLayoutEffect(() => {}, [])

	return (
		<SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
			<ScrollView
				contentContainerStyle={{
					flexGrow: 1,
					paddingBottom: 20,
					justifyContent: 'flex-start',
					alignItems: 'center',
				}}
				alwaysBounceVertical={false}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.header}>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Ionicons name='home' color={COLORS.primary500} size={52} />
						<View style={{ marginLeft: 10 }}>
							<Text style={styles.name}>{schoolCtx.schoolData.nome}</Text>
							<Text style={styles.points}>
								Pontuação:{' '}
								{schoolCtx.schoolData.points > -1 ? schoolCtx.schoolData.points : 'Carregando...'}
							</Text>
						</View>
					</View>
					<View>
						<View
							style={{
								borderRadius: 10,
								overflow: 'hidden',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Pressable
								android_ripple={{ color: '#ccc' }}
								style={{ padding: 5 }}
								onPress={() => authCtx.logout()}
							>
								<Ionicons name='exit-outline' color={COLORS.primary500} size={32} />
							</Pressable>
						</View>
					</View>
				</View>
				<View style={{ borderColor: COLORS.secondary400, borderTopWidth: 1, width: '100%' }} />
				<View style={styles.actionList}>
					<SchoolHomeListItem
						title='Ranking das Escolas'
						icon='stats-chart'
						onPress={() => navigation.navigate('RankingEscolas' as never)}
					/>
					<SchoolHomeListItem
						icon='cube'
						title='Histórico de Entregas'
						onPress={() => navigation.navigate('HistoricoEntregasEscolas' as never)}
					/>
					<SchoolHomeListItem
						icon='gift'
						title='Histórico de Resgates'
						onPress={() => navigation.navigate('HistoricoResgatesEscolas' as never)}
					/>
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
	header: {
		paddingHorizontal: '5%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 20,
		marginBottom: 26,
		width: '100%',
	},
	name: {
		fontSize: 16,
		fontWeight: '600',
		maxWidth: 280,
	},
	points: {},
	actionList: {
		marginTop: 24,
	},
})
