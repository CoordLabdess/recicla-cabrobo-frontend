import { View, Text, StyleSheet, Image } from 'react-native'
import { COLORS } from '../../constants/colors'

interface ProfileInfoCardProps {
	name?: string
	serie?: string
	profileImg?: string
	uniqueCode?: string
	points?: number
	type?: 'School' | 'Student'
}

export function ProfileInfoCard(props: ProfileInfoCardProps) {
	return (
		<View style={styles.shadowContainer}>
			<View style={styles.cardContainer}>
				<View style={[styles.container, { marginBottom: 6, marginTop: 21 }]}>
					<View style={styles.profileImageContainer}>
						<Image style={styles.profileImage} source={{ uri: props.profileImg }} />
					</View>
				</View>
				<View style={[styles.container, { marginBottom: 6 }]}>
					<Text style={styles.h2}>{props.name}</Text>
				</View>
				<View style={styles.container}>
					<Text style={styles.h1}>{props.points}pts</Text>
				</View>
				<View style={styles.topics}>
					<View style={styles.topicContainer}>
						<Text style={styles.topicTitle}>Matrícula:</Text>
						<Text style={styles.topicText}>{props.uniqueCode}</Text>
					</View>
					<View style={styles.topicContainer}>
						<Text style={styles.topicTitle}>Série:</Text>
						<Text style={styles.topicText}>9º ano</Text>
					</View>
					<View style={styles.topicContainer}>
						<Text style={styles.topicTitle}>Escola:</Text>
						<Text style={styles.topicText}>Escola das Flores</Text>
					</View>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	shadowContainer: {
		borderRadius: 16,
		backgroundColor: 'transparent',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
	},
	cardContainer: {
		backgroundColor: '#fff',
		borderColor: COLORS.primary500,
		paddingHorizontal: 10,
		height: 385,
		width: 280,
		borderWidth: 3,
		borderRadius: 16,
		overflow: 'hidden',
	},
	container: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	profileImageContainer: {
		borderRadius: 100,
		overflow: 'hidden',
		backgroundColor: COLORS.secondary500,
	},
	profileImage: {
		height: 81,
		width: 81,
	},
	h1: {
		fontSize: 20,
		color: COLORS.secondary500,
		textAlign: 'center',
	},
	h2: {
		fontSize: 16,
		textAlign: 'center',
	},
	topics: {
		marginTop: 40,
	},
	topicContainer: {
		flexDirection: 'row',
		width: '100%',
		marginBottom: 10,
		alignItems: 'flex-end',
	},
	topicTitle: {
		fontWeight: '600',
		fontSize: 18,
		marginRight: 5,
	},
	topicText: {
		color: COLORS.secondary500,
		fontSize: 14,
	},
})
