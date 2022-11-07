import { useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import { View, Text, StyleSheet } from 'react-native'
import { COLORS } from '../../constants/colors'

interface FiltroTurmaProps {
	onChange: (text: string) => void
}

export function FiltroTurma(props: FiltroTurmaProps) {
	const [text, setText] = useState('')
	return (
		<View>
			<Text>Turma</Text>
			<View style={{ overflow: 'hidden', borderRadius: 15 }}>
				<Picker
					style={[styles.textInput, { fontSize: 20, fontWeight: '600' }]}
					selectedValue={text}
					onValueChange={value => {
						props.onChange(value)

						setText(value)
					}}
					enabled={true}
				>
					<Picker.Item label='- Selecione uma turma -' value='' />
					<Picker.Item label='4º ano' value='4º ano' />
					<Picker.Item label='5º ano' value='5º ano' />
					<Picker.Item label='6º ano' value='6º ano' />
					<Picker.Item label='7º ano' value='7º ano' />
					<Picker.Item label='8º ano' value='8º ano' />
					<Picker.Item label='9º ano' value='9º ano' />
					<Picker.Item label='Multisérie' value='Multiserie' />
				</Picker>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	textInput: {
		backgroundColor: COLORS.secondary400,
		fontSize: 14,
		paddingVertical: 9,
		paddingHorizontal: 17,
		borderRadius: 16,
	},
})
