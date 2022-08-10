import { useContext } from 'react'
import { View, Text, FlatList, StyleSheet, ScrollView, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NotificationCard } from '../../../components/home/NotificationCard'
import { PrimaryButton } from '../../../components/ui/Buttons'
import { COLORS } from '../../../constants/colors'
import { AuthContext } from '../../../store/context/authContext'
import { Ionicons } from '@expo/vector-icons'

export function SchoolHomeScreen() {
	const authCtx = useContext(AuthContext)
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
				<View style={styles.header}>
					<View>
						<Text style={styles.name}>Escola Municipal Fulano de Tal</Text>
						<Text style={styles.points}>Pontuação: 2403</Text>
					</View>
					<View style={{ borderRadius: 10, overflow: 'hidden' }}>
						<Pressable
							android_ripple={{ color: '#ccc' }}
							style={{ padding: 5 }}
							onPress={() => authCtx.logout()}
						>
							<Ionicons name='exit-outline' color={COLORS.primary500} size={32} />
						</Pressable>
					</View>
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
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingTop: 20,
		width: '100%',
	},
	name: {
		fontSize: 16,
		fontWeight: '600',
	},
	points: {},
})
