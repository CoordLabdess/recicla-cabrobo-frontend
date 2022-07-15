import { Pressable, Text, View, TextStyle, ViewStyle, StyleSheet } from 'react-native'
import { COLORS } from '../../constants/colors'

interface ButtonProps {
	title: string
	style?: ViewStyle
	textStyle?: TextStyle
	onPress: () => void
}

export function CustomButton(props: ButtonProps) {
	return (
		<Pressable style={props.style} onPress={props.onPress}>
			<Text style={props.textStyle}>{props.title}</Text>
		</Pressable>
	)
}

export function PrimaryButton(props: ButtonProps) {
	return (
		<View style={primaryButtonStyles.outterContainer}>
			<Pressable
				android_ripple={{ color: '#ccc' }}
				style={[primaryButtonStyles.buttonContainer, props.style]}
				onPress={props.onPress}
			>
				<Text style={[primaryButtonStyles.text, props.textStyle]}>{props.title}</Text>
			</Pressable>
		</View>
	)
}

const primaryButtonStyles = StyleSheet.create({
	outterContainer: {
		borderRadius: 50,
		overflow: 'hidden',
	},
	buttonContainer: {
		backgroundColor: COLORS.primary500,
		paddingVertical: 5,
		paddingHorizontal: 10,
		height: 57,
		width: 254,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 50,
	},
	text: {
		color: COLORS.secondary100,
		fontSize: 25,
		fontWeight: '600',
	},
})
