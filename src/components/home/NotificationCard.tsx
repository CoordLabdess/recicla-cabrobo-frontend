import { View, Text, StyleSheet } from 'react-native'
import { COLORS } from '../../constants/colors'
import { PrimaryButton } from '../ui/Buttons'

export function NotificationCard(props: { title: string; goTo: string; date: Date }) {
	return (
		<View style={styles.shadowContainer}>
			<View style={styles.cardContainer}>
				<Text style={styles.title}>Sua escola está em 4º lugar no ranking das escolas</Text>

				<Text style={styles.date}>{props.date.toLocaleDateString()}</Text>

				<View style={styles.elementContainer}>
					<PrimaryButton
						marginTop={40}
						textStyle={{ fontSize: 18 }}
						title='Visualizar'
						onPress={() => console.log('click')}
					/>
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
		marginBottom: 40,
	},
	cardContainer: {
		backgroundColor: COLORS.secondary100,
		padding: 23,
		width: 345,
		borderRadius: 16,
		overflow: 'hidden',
	},

	elementContainer: {
		alignItems: 'center',
	},

	title: {
		fontSize: 18,
		fontWeight: '600',
	},
	date: {
		marginTop: 4,
		fontSize: 13,
		textAlign: 'left',
	},
})
