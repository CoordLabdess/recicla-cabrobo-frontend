import { View, Text, StyleSheet, Pressable, TextProps } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../constants/colors'

interface RoundIconButtonProps {
	iconName?: string
	iconColor?: string
	buttonColor?: string
	onPress?: () => void
	isLoading?: boolean
	isDisabled?: boolean
	size?: number
}

export function RoundIconButton(props: RoundIconButtonProps) {
	return (
		<View style={{ alignItems: 'center' }}>
			<View style={styles.shadowContainer}>
				<View
					style={{
						overflow: 'hidden',
						borderRadius: 25,
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Pressable
						style={styles.cardContainer}
						android_ripple={{ color: '#ccc' }}
						onPress={props.onPress}
					>
						<Ionicons
							name={(props.iconName as any) || 'add'}
							color={props.iconColor || '#fff'}
							size={props.size || 25}
						/>
					</Pressable>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	shadowContainer: {
		borderRadius: 10000,
		backgroundColor: 'transparent',
		alignItems: 'center',
		justifyContent: 'center',
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
		padding: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
})
