import { View, Text, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '../../constants/colors'

export function LoadingScreen() {
	return (
		<SafeAreaView
			edges={['top', 'left', 'right']}
			style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}
		>
			<Text style={{ color: COLORS.secondary500, fontSize: 25, marginBottom: 20 }}>
				Carregando...
			</Text>
			<ActivityIndicator color={COLORS.secondary500} size={150} />
		</SafeAreaView>
	)
}
