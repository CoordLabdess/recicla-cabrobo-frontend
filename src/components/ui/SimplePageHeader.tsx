import { View, Text, Pressable, ViewStyle } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'

interface SimplePageHeader {
	title: string
	style?: ViewStyle
}

export function SimplePageHeader(props: SimplePageHeader) {
	const navigation = useNavigation()
	return (
		<View
			style={[
				{
					flexDirection: 'row',
					justifyContent: 'space-between',
					paddingHorizontal: 20,
					marginVertical: 20,
				},
				props.style,
			]}
		>
			<Pressable
				style={{ alignItems: 'center', flexDirection: 'row' }}
				onPress={() => {
					navigation.goBack()
				}}
			>
				<Ionicons name='arrow-back' size={32} color='#838495' />
			</Pressable>
			<Text style={{ fontSize: 22, color: '#838495', textAlign: 'center', marginVertical: 10 }}>
				{props.title}
			</Text>
			<View style={{ opacity: 0, alignItems: 'center', flexDirection: 'row' }}>
				<Ionicons name='arrow-back' size={32} color='#838495' />
			</View>
		</View>
	)
}
