import { View, Text } from 'react-native'
import { COLORS } from '../../constants/colors'

export function NoHistoryMessage(props: { msg: string }) {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text style={{ fontSize: 20, fontWeight: '500', color: COLORS.secondary500 }}>
				{props.msg || 'Ainda não há registros'}
			</Text>
		</View>
	)
}
