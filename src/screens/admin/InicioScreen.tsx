import { SchoolHomeListItem } from '../../components/home/SchoolHomeListItem'
import { View, Text, FlatList, StyleSheet, ScrollView, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NotificationCard } from '../../components/home/NotificationCard'
import { PrimaryButton } from '../../components/ui/Buttons'
import { COLORS } from '../../constants/colors'
import { AuthContext } from '../../store/context/authContext'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { SchoolContext } from '../../store/context/schoolContext'
import { getSchoolPointsById } from '../../utils/school'
import { useContext } from 'react'

export function InicioScreen() {
	const navigation = useNavigation()
	const authCtx = useContext(AuthContext)
	const adminCtx = useContext(SchoolContext)

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
				<View style={styles.adminHeader}>
					<View>
						<Text style={styles.charge}>{`Adminstrador(a)`}</Text>
						<Text style={styles.name}>{adminCtx.schoolData.nomeGestor}</Text>
					</View>
					<Pressable onPress={authCtx.logout}>
						<Ionicons name='exit-outline' color={COLORS.primary500} size={40} />
					</Pressable>
				</View>

				<View style={styles.actionList}>
					<SchoolHomeListItem
						title='Gerenciar Estoque'
						icon='cube-sharp'
						onPress={() => navigation.navigate('AdminGerenciarEstoque' as never)}
					/>
					<SchoolHomeListItem
						icon='time'
						title='Histórico de Entregas'
						onPress={() => navigation.navigate('AdminHistoricoEntregas' as never)}
					/>
					<SchoolHomeListItem
						icon='time'
						title='Histórico de Resgates'
						onPress={() => navigation.navigate('AdminHistoricoResgates' as never)}
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
		fontSize: 20,
		maxWidth: 280,
	},
	points: {},
	actionList: {
		marginTop: 24,
	},
	adminHeader: {
		paddingHorizontal: '5%',
		flexDirection: 'row',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 10,
		borderBottomWidth: 1,
		borderColor: COLORS.secondary500,
		marginBottom: 20,
	},
	charge: {
		fontSize: 20,
		fontWeight: '600',
	},
})
