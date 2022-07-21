import { View, Text, Pressable, ViewStyle, TextStyle } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../constants/colors'

interface SimplePageHeader {
	title: string
	style?: ViewStyle
	textStyle?: TextStyle
	dontShowGoBack?: boolean
}

export function SimplePageHeader(props: SimplePageHeader) {
	const navigation = useNavigation()
	return (
		<View
			style={[
				{
					alignItems: 'center',
					flexDirection: 'row',
					justifyContent: 'space-evenly',
					marginVertical: 20,
				},
				props.style,
			]}
		>
			<Pressable
				style={[
					{ alignItems: 'center', flexDirection: 'row', marginRight: 15 },
					props.dontShowGoBack && { width: 0, height: 0, opacity: 0 },
				]}
				onPress={() => {
					navigation.goBack()
				}}
			>
				<Ionicons name='arrow-back' size={32} color={COLORS.primary500} />
			</Pressable>
			<Text
				style={[
					{ fontSize: 22, color: COLORS.primary500, textAlign: 'center', marginVertical: 10 },
					props.textStyle,
				]}
			>
				{props.title}
			</Text>
			<View
				style={[
					{ opacity: 0, alignItems: 'center', flexDirection: 'row', marginLeft: 15 },
					,
					props.dontShowGoBack && { width: 0, height: 0, opacity: 0 },
				]}
			>
				<Ionicons name='arrow-back' size={32} color={COLORS.primary500} />
			</View>
		</View>
	)
}
