import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../constants/colors'
import { AuthContext } from '../../store/context/authContext'
import { useContext } from 'react'
import { UserStatus } from '../../components/home/UserStatus'
import { ProfileActions } from '../../components/home/ProfileActions'
import { StudentContext } from '../../store/context/studentContext'

interface ProfileHeaderProps {}

export function ProfileHeader(props: ProfileHeaderProps) {
	const authCtx = useContext(AuthContext)
	const studentCtx = useContext(StudentContext)
	const student = studentCtx.getStudentData()
	function logout() {
		authCtx.logout()
	}

	return (
		<View>
			<View style={styles.root}>
				<View style={styles.infoContainer}>
					<View style={styles.imageContainer}>
						<Image
							style={styles.image}
							resizeMode={'cover'}
							source={{
								uri: 'https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
							}}
						/>
					</View>
					<View style={{ maxWidth: 200 }}>
						<Text style={styles.name}>{student.name}</Text>
						<Text style={styles.tag}>Aluno</Text>
					</View>
				</View>
				<View style={{ borderRadius: 10, overflow: 'hidden' }}>
					<Pressable
						onPress={logout}
						android_ripple={{ color: '#ccc' }}
						style={{ padding: 2, alignItems: 'center', justifyContent: 'center' }}
					>
						<Ionicons name='exit-outline' color={COLORS.primary500} size={36} />
					</Pressable>
				</View>
			</View>
			<UserStatus points={student.points} />
			<ProfileActions />
		</View>
	)
}

const styles = StyleSheet.create({
	root: {
		flexDirection: 'row',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		paddingTop: 20,
	},
	infoContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	imageContainer: {
		backgroundColor: '#ccc',
		borderRadius: 100,
		height: 92,
		width: 92,
		overflow: 'hidden',
		marginRight: 20,
	},
	image: {
		height: '100%',
	},
	name: {
		fontSize: 14,
	},
	tag: {
		color: '#7C7C7C',
	},
})
