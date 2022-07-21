import {
	Pressable,
	Text,
	View,
	TextStyle,
	ViewStyle,
	StyleSheet,
	ActivityIndicator,
} from 'react-native'
import { COLORS } from '../../constants/colors'

interface ButtonProps {
	title: string
	style?: ViewStyle
	textStyle?: TextStyle
	innerContainerStyle?: ViewStyle
	onPress: () => void
	isLoading?: boolean
}

export function CustomButton(props: ButtonProps) {
	return (
		<View>
			<Pressable style={props.style} onPress={props.onPress}>
				{props.isLoading ? (
					<ActivityIndicator color={props.textStyle?.color} size={props.textStyle?.fontSize} />
				) : (
					<Text style={props.textStyle}>{props.title}</Text>
				)}
			</Pressable>
		</View>
	)
}

export function PrimaryButton(props: ButtonProps) {
	return (
		<View style={[primaryButtonStyles.outterContainer, props.style]}>
			<Pressable
				android_ripple={{ color: '#ccc' }}
				style={[primaryButtonStyles.buttonContainer, props.innerContainerStyle]}
				onPress={props.isLoading ? () => {} : props.onPress}
			>
				{props.isLoading ? (
					<ActivityIndicator
						color={primaryButtonStyles.text.color}
						size={primaryButtonStyles.text.fontSize}
					/>
				) : (
					<Text style={[primaryButtonStyles.text, props.textStyle]}>{props.title}</Text>
				)}
			</Pressable>
		</View>
	)
}

const primaryButtonStyles = StyleSheet.create({
	outterContainer: {
		backgroundColor: COLORS.primary500,
		height: 57,
		width: 200,
		borderRadius: 50,
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 4,
		overflow: 'hidden',
	},
	buttonContainer: {
		backgroundColor: COLORS.primary500,
		height: '100%',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		color: '#fff',
		fontWeight: '600',
		fontSize: 25,
	},
})
