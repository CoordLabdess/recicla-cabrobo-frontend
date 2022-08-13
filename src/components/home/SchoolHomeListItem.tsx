import { View, Text, StyleSheet, Pressable } from 'react-native'
import { COLORS } from '../../constants/colors'
import { Ionicons } from '@expo/vector-icons'

interface SchoolHomeListItemProps {
	title: string
	icon: string
	onPress: () => void
}

export function SchoolHomeListItem(props: SchoolHomeListItemProps) {
	return (
		<View style={styles.shadowContainer}>
			<View style={{ overflow: 'hidden', borderRadius: 15 }}>
				<Pressable
					android_ripple={{ color: '#ccc' }}
					style={styles.cardContainer}
					onPress={props.onPress}
				>
					<Ionicons
						name={props.icon || ('stats-chart' as any)}
						color={COLORS.secondary100}
						size={70}
					/>
					<Text style={styles.title}>{props.title}</Text>
				</Pressable>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	shadowContainer: {
		borderRadius: 15,
		backgroundColor: 'transparent',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
		marginBottom: 24,
	},
	cardContainer: {
		padding: 15,
		flexDirection: 'column',
		alignItems: 'center',
		backgroundColor: COLORS.primary500,
		alignContent: 'center',
		justifyContent: 'center',
		width: 182,
		height: 182,
		borderRadius: 15,
		overflow: 'hidden',
	},
	title: {
		fontSize: 15,
		fontWeight: '600',
		textAlign: 'center',
		marginTop: 5,
		color: COLORS.secondary100,
	},
})
