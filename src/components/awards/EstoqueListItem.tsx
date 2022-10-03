import { View, Pressable, Text, StyleSheet } from 'react-native'
import { useState } from 'react'
import { COLORS } from '../../constants/colors'
import { Award } from '../../utils/student'

interface EstoqueListItemProps {
	premio: Award
	onPress?: (premio: Award) => void
}

export function EstoqueListItem(props: EstoqueListItemProps) {
	const [open, setOpen] = useState(false)

	return (
		<View style={styles.container}>
			<Pressable
				android_ripple={{ color: COLORS.secondary500 }}
				style={styles.pressable}
				onPress={() => {
					setOpen(!open)
					props.onPress && props.onPress(props.premio)
				}}
			>
				<Text style={styles.title}>{props.premio.nome}</Text>
				<Text style={styles.ammount}>{props.premio.estoque}</Text>
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		borderRadius: 10,
		overflow: 'hidden',
		height: 70,
		width: 340,
		marginBottom: 20,
	},
	pressable: {
		flex: 1,
		paddingHorizontal: 15,
		backgroundColor: COLORS.secondary400,
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	title: {
		fontSize: 20,
		maxWidth: 250,
		textAlign: 'center',
	},
	ammount: {
		fontSize: 20,
	},
})
