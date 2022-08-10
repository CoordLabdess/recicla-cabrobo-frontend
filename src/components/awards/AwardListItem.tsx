import { View, Pressable, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Award } from '../../data/awards'
import { COLORS } from '../../constants/colors'
import { useNavigation } from '@react-navigation/native'

interface AwardListemItemProps {
	award: Award
	onPress: () => void
}

export function AwardListItem(props: AwardListemItemProps) {
	const navigation = useNavigation()
	return (
		<View style={styles.shadowContainer}>
			<View style={{ overflow: 'hidden', borderRadius: 27 }}>
				<Pressable
					style={styles.cardContainer}
					android_ripple={{ color: '#ccc' }}
					onPress={props.onPress}
				>
					<View>
						<Text style={styles.title}>{props.award.title}</Text>
						<Text>{props.award.price} pts</Text>
					</View>
					<Ionicons name={'chevron-forward-outline'} size={32} color='#000' />
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
		marginBottom: 25,
	},
	cardContainer: {
		backgroundColor: '#fff',
		width: 345,
		borderRadius: 27,
		overflow: 'hidden',
		paddingHorizontal: 29,
		paddingVertical: 16,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	title: {
		fontSize: 15,
		fontWeight: '600',
	},
})
