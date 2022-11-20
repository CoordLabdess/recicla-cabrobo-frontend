import { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { COLORS } from '../../constants/colors'
import { Select } from 'native-base'

interface FiltroTurmaProps {
	onChange: (text: string) => void
}

export function FiltroTurma(props: FiltroTurmaProps) {
	const [text, setText] = useState('')
	return (
		<View>
			<Text>Turma</Text>
			<View style={{ overflow: 'hidden', borderRadius: 15 }}>
				<Select
					fontSize={20}
					fontWeight={600} selectedValue={text}
					backgroundColor={COLORS.secondary400}
					py={9}
					px={17}
					borderRadius={16}
					onValueChange={value => {
						props.onChange(value)
						setText(value)
					}}
					placeholder="Selecione uma turma"
				>
					<Select.Item label='- Selecione uma turma -' value='' />
					<Select.Item label='4º ano' value='4º ano' />
					<Select.Item label='5º ano' value='5º ano' />
					<Select.Item label='6º ano' value='6º ano' />
					<Select.Item label='7º ano' value='7º ano' />
					<Select.Item label='8º ano' value='8º ano' />
					<Select.Item label='9º ano' value='9º ano' />
					<Select.Item label='Multisérie' value='Multiserie' />
				</Select>
			</View>
		</View >
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
