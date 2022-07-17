import { useLayoutEffect, useState } from 'react'
import { View, TextInput, StyleSheet, ViewStyle, TextStyle, StyleProp } from 'react-native'

interface TextInputProps {
	placeholder?: string
	value?: string
	setValue?: Function
	style?: StyleProp<TextStyle>
	onChangeText?: (text: string) => void
	secureTextEntry?: boolean
}

export function PrimaryTextInput(props: TextInputProps) {
	return (
		<TextInput
			secureTextEntry={props.secureTextEntry}
			style={[primaryTextInputStyle.input, props.style]}
			placeholder={props.placeholder}
			value={props.value}
			onChangeText={props.onChangeText}
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
