import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import { COLORS } from '../../constants/colors'
import { Student } from '../../data/students'
import { useNavigation } from '@react-navigation/native'

interface StudentListItemProps {
	student: Student
}

export function StudentListItem(props: StudentListItemProps) {
	const navigation = useNavigation()

	return (
		<View style={styles.shadowContainer}>
			<View style={{ overflow: 'hidden', borderRadius: 27 }}>
				<Pressable
					style={styles.cardContainer}
					android_ripple={{ color: '#ccc' }}
					onPress={() =>
						navigation.navigate(
							'StudentProfileInfo' as never,
							{ student: props.student, editable: true } as never,
						)
					}
				>
					<View style={styles.profileImageContainer}>
						<Image
							style={styles.profileImage}
							source={{
								uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
							}}
						/>
					</View>
					<View style={{ flex: 1 }}>
						<Text style={styles.profileInfoName}>{props.student.nome}</Text>
						<Text style={styles.profileMinorInfo}>
							Nº de Matrícula: {props.student.studentCode}
						</Text>
						<Text style={styles.profileMinorInfo}>Série: {'5º ano'}</Text>
					</View>
				</Pressable>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	shadowContainer: {
		borderRadius: 27,
		backgroundColor: 'transparent',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
		marginBottom: 14,
	},
	cardContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#fff',
		paddingHorizontal: 9,
		paddingVertical: 4,
		width: 345,
		minHeight: 100,
		borderRadius: 27,
		overflow: 'hidden',
	},
	profileImageContainer: {
		height: 80,
		width: 80,
		borderRadius: 100,
		overflow: 'hidden',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: COLORS.secondary400,
		marginRight: 10,
	},
	profileImage: {
		height: '100%',
		width: '100%',
	},
	profileInfoName: {
		fontSize: 14,
	},
	profileMinorInfo: {
		fontSize: 12,
		color: COLORS.secondary500,
	},
})
