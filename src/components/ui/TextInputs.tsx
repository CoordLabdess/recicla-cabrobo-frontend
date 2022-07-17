import { useLayoutEffect, useState } from 'react'
import {
	View,
	TextInput,
	StyleSheet,
	ViewStyle,
	TextStyle,
	StyleProp,
	KeyboardTypeOptions,
} from 'react-native'

interface TextInputProps {
	placeholder?: string
	value?: string
	setValue?: Function
	style?: StyleProp<TextStyle>
	onChangeText?: (text: string) => void
	secureTextEntry?: boolean
	keyboardType?: KeyboardTypeOptions
}

export function PrimaryTextInput(props: TextInputProps) {
	return (
		<TextInput
			keyboardType={props.keyboardType}
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
