import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native'
import { useContext } from 'react'
import { SchoolContext } from '../../store/context/schoolContext'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../constants/colors'
import { AuthContext } from '../../store/context/authContext'

export function InicioScreen() {
	const authCtx = useContext(AuthContext)
	const adminCtx = useContext(SchoolContext)

	return (
		<SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
			<ScrollView
				contentContainerStyle={{
					flexGrow: 1,
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
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: '#fff',
	},
	adminHeader: {
		flexDirection: 'row',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: '5%',
		paddingVertical: 10,
		borderBottomWidth: 1,
		borderColor: COLORS.secondary500,
	},
	charge: {
		fontSize: 20,
		fontWeight: '600',
	},
	name: {
		fontSize: 20,
	},
})
