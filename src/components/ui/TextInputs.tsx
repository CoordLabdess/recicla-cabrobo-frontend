import { View, TextInput, StyleSheet, ViewStyle } from 'react-native'

interface TextInputProps {
	placeholder?: string
	value?: string
	setValue?: Function
	style?: ViewStyle
}

export function PrimaryTextInput(props: TextInputProps) {
	function changeInputValue(text: string) {
		props.setValue && props.setValue(text)
	}

	return (
		<TextInput
			style={[primaryTextInputStyle.input, props.style]}
			placeholder={props.placeholder}
			value={props.value}
			onChangeText={changeInputValue}
		/>
	)
}

const primaryTextInputStyle = StyleSheet.create({
	input: {
		backgroundColor: '#EEEEEE',
		borderRadius: 16,
		paddingHorizontal: 21,
	},
})
