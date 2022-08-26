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
	avoidClick?: boolean
	textStyle?: TextStyle
	marginLeft?: number
	marginTop?: number
	marginRight?: number
	marginBottom?: number
	style?: ViewStyle
	borderRadius?: number
	outterContainerStyle?: ViewStyle
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
		<View
			style={[
				primaryButtonStyles.shadowContainer,
				{ borderRadius: props.borderRadius || 100 },
				{
					marginBottom: props.marginBottom,
					marginLeft: props.marginLeft,
					marginRight: props.marginRight,
					marginTop: props.marginTop,
				},
			]}
		>
			<View
				style={[
					{ overflow: 'hidden', borderRadius: props.borderRadius || 100 },
					props.outterContainerStyle,
				]}
			>
				<Pressable
					android_ripple={{ color: !props.avoidClick ? '#ccc' : 'transparent' }}
					style={[
						primaryButtonStyles.cardContainer,
						props.innerContainerStyle,
						props.avoidClick && { backgroundColor: COLORS.secondary400 },
					]}
					onPress={props.isLoading || props.avoidClick ? () => {} : props.onPress}
				>
					<Text
						style={[
							primaryButtonStyles.text,
							props.textStyle,
							props.isLoading ? { opacity: 0 } : { opacity: 1 },
						]}
					>
						{props.title}
					</Text>
					<ActivityIndicator
						style={[{ position: 'absolute' }, props.isLoading ? { opacity: 1 } : { opacity: 0 }]}
						color={primaryButtonStyles.text.color}
						size={primaryButtonStyles.text.fontSize}
					/>
				</Pressable>
			</View>
		</View>
	)
}

const primaryButtonStyles = StyleSheet.create({
	shadowContainer: {
		borderRadius: 100,
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
		backgroundColor: COLORS.primary500,
		paddingVertical: 10,
		paddingHorizontal: 25,
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		color: '#fff',
		fontWeight: '600',
		fontSize: 25,
	},
})
