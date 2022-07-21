import { View, Text, StyleSheet } from 'react-native'

interface ErrorMessageProps {
	children: React.ReactNode
	isActive: boolean
}

export function ErrorMessage(props: ErrorMessageProps) {
	return (
		<Text style={props.isActive ? styles.errorMessage : styles.invisible}>{props.children}</Text>
	)
}

const styles = StyleSheet.create({
	errorMessage: {
		color: '#ff2525',
		fontSize: 11,
		marginLeft: 5,
	},
	invisible: {
		width: 0,
		height: 0,
	},
})
